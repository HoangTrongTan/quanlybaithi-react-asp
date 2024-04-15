using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Models;

namespace Webquanlybaithi.Respositories
{
    public class TaiKhoanRespositories : ITaiKhoanRespositories
    {
        private readonly WebQuanlybaithiContext _context;
        private readonly IConfiguration _configuration;
        public TaiKhoanRespositories(WebQuanlybaithiContext ctx, IConfiguration configuration)
        {
            _context = ctx;
            _configuration = configuration;
        }
        public async Task<Taikhoan> register(Taikhoan tk)
        {
            CreatePasswordHash(tk.UserpassHash, out Byte[] passwordHash, out Byte[] passwordSalt);
            tk.UserpassHash = Convert.ToBase64String(passwordHash);
            tk.UserpassSalt = Convert.ToBase64String(passwordSalt);
            _context.Taikhoans.Add(tk);
            await _context.SaveChangesAsync();

            return tk;
        }
        

        public async Task<string> get(Taikhoan tk)
        {
            var user = await _context.Taikhoans.FirstOrDefaultAsync(tk => tk.Username == tk.Username && tk.UserpassHash == tk.UserpassHash);
            if (user == null) return "tk";
            if (!VeriPasswordHash(tk.UserpassHash, Convert.FromBase64String(user.UserpassHash), Convert.FromBase64String(user.UserpassSalt)))
                return "mk";
            string token = CreateToken(user);
            return token;
        }

        
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }

        private bool VeriPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computerHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computerHash.SequenceEqual(passwordHash);
            }
        }
        public async Task<string> changepass(TaiKhoanChangePasss tk)
        {
            var model = await _context.Taikhoans.FirstOrDefaultAsync(ite => ite.Username == tk.taikhoan && ite.UserpassHash == tk.matkhaucu);
            if (model == null)
            {
                return null;
            }
            model.UserpassHash = tk.matkhaumoi;
            await _context.SaveChangesAsync();
            return "Thay đổi mật khẩu thành công !!";
        }
        private string CreateToken(Taikhoan user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim("MaKhoa", user.Makhoa ?? "0"), 
                new Claim("TenDangNhap", user.Tendangnhap),
                new Claim("maUser", user.Username),
                new Claim("maLopds", Convert.ToString(user.Idlop ?? 0)),
                new Claim("maKhoaDk", Convert.ToString(user.Idkhoadk ?? 0)),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                    _configuration.GetSection("AppSettings:Token").Value
                ));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                 claims: claims,
                 expires: DateTime.Now.AddDays(1),
                 signingCredentials: cred);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
        
        public async Task<string[]> getUser(Taikhoan tk)
        {
            var user = await _context.Taikhoans.FirstOrDefaultAsync(temp => temp.Username == tk.Username && temp.UserpassHash == tk.UserpassHash);
            if (user == null) return null;
            string token = CreateToken(user);
            return new[] { token, user.Chucvuloai };
        }
        private string GenerateToken(Taikhoan tk)
        {
            var secuiritykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(secuiritykey, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"] , _configuration["Jwt:Audience"], null, 
                expires:DateTime.Now.AddMinutes(1),
                signingCredentials:credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
