using System.Security.Cryptography;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Webquanlybaithi.Respositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Net.Http;
using System.Web;

namespace Webquanlybaithi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaiKhoanController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ITaiKhoanRespositories resp;

        public TaiKhoanController(IConfiguration configuration,ITaiKhoanRespositories respositories) 
        { 
            _configuration = configuration;
            resp = respositories;
        }
        [HttpPost("register")]
        public async Task<ActionResult<Taikhoan>> Register(Taikhoan tk)
        {
            try
            {

                return Ok(await resp.register(tk));
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login(Taikhoan tk)
        {
            var data = await resp.getUser(tk);
            if (data[0] ==  null)
            {
                return BadRequest("Tài khoản không tồn tại");
            }else
            {
                var cookieoptions = new CookieOptions()
                {
                    HttpOnly = true,
                    Expires = DateTime.Now.AddDays(1)
                };
                Response.Cookies.Append("refreshtoken", data[0], cookieoptions);
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, tk.Username),
                    //new Claim(ClaimTypes.Role, tk.Chucvuloai),
                };
                var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var properties = new AuthenticationProperties
                {
                    IsPersistent = false
                };
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity), properties);
                //. Thông thường, đây là một ô kiểu checkbox trong giao diện người dùng.
                //Nếu người dùng chọn "nhớ đăng nhập"(tích chọn checkbox), thì model.RememberMe sẽ là true, ngược lại nếu không chọn "nhớ đăng nhập" thì model.RememberMe sẽ là false.
                //nếu model.RememberMe là true, cookie sẽ được đánh dấu là "lâu dài"(persistent), tức là nó sẽ được lưu trữ trên máy tính của người
                //dùng qua nhiều phiên làm việc. Ngược lại, nếu model.RememberMe là false, cookie chỉ tồn tại trong phiên 
                //làm việc hiện tại của người dùng và sẽ hết hiệu lực khi họ đóng trình duyệt.
                return Ok(new
                {
                    token = data[0],
                    loai = data[1]
                });
            }
        }
        
        [HttpGet("get-user-info")]
        [Authorize] // Bảo vệ endpoint này với JWT Authorization
        public ActionResult<string> GetUserInfo()
        {
            try
            {
                // Lấy thông tin từ Principal của người dùng hiện tại (đã được xác minh qua JWT)
                var username = User.Identity.Name; // ClaimTypes.Name
                var maKhoa = User.FindFirst("MaKhoa")?.Value;
                var tenDangNhap = User.FindFirst("TenDangNhap")?.Value;
                var maUser = User.FindFirst("maUser")?.Value;
                var maLopds = User.FindFirst("maLopds")?.Value;
                var maKhoaDk = User.FindFirst("maKhoaDk")?.Value;

                // Bạn có thể sử dụng các thông tin này theo cách bạn muốn
                // Ví dụ: trả về JSON chứa thông tin người dùng
                var userInfo = new
                {
                    Username = username,
                    MaKhoa = maKhoa,
                    TenDangNhap = tenDangNhap,
                    MaUser = maUser,
                    MaLopds = maLopds,
                    MaKhoaDk = maKhoaDk
                };

                return Ok(userInfo);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public async Task<ActionResult<Taikhoan>> changepass(TaiKhoanChangePasss tk)
        {
            try
            {
                var rs = await resp.changepass(tk);
                if(rs == null)
                {
                    return Conflict("Mật khẩu không đúng !!");
                }
                return Ok(rs);
            }catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}