using Microsoft.EntityFrameworkCore;
using Webquanlybaithi.Models;
using Webquanlybaithi.Entities;

namespace Webquanlybaithi.Respositories
{
    public class HocPhanRespositories : IHocPhanRespositories
    {
        private readonly WebQuanlybaithiContext _context;
        public HocPhanRespositories(WebQuanlybaithiContext ctx)
        {
            _context = ctx;
        }
        public async Task<List<Monhockhoa>> all()
        {
            return await _context.Monhockhoas.ToListAsync();
        }

        public async Task<List<HocPhanDTO>> getByKhoa(string khoa)
        {
            var hocPhanList = await _context.Monhockhoas
            .Where(mhk => mhk.Khoa == khoa) // Lọc dữ liệu theo giá trị của cột KHOA
            .Select(mhk => new HocPhanDTO
            {
                MA = mhk.MahocphanNavigation.Ma, // Lấy MA từ bảng Hocphan
                TENHOCPHAN = mhk.MahocphanNavigation.Tenhocphan // Lấy TENHOCPHAN từ bảng Hocphan
            })
            .ToListAsync();

            return hocPhanList;
        }
        public async Task<List<Monhockhoa>> getTenhocPhanByKhoa(string khoa)
        {
            var hocPhanList = await _context.Monhockhoas
           .Where(mhk => mhk.Khoa == khoa) // Lọc dữ liệu theo giá trị của cột KHOA
           .Select(mhk => new Monhockhoa
           {
               Id = mhk.Id,
               Mahocphan = mhk.Mahocphan,
               Khoa = mhk.Khoa,
               MahocphanNavigation = new Hocphan
               {
                   Ma = mhk.MahocphanNavigation.Ma,
                   Tenhocphan = mhk.MahocphanNavigation.Tenhocphan,
               }
           })
           .ToListAsync();

            return hocPhanList;
        }
        public async Task<string> getMaByName(string name)
        {
            var model = await _context.Hocphans
                                        .Where( mon => mon.Tenhocphan.Contains(name) )
                                        .FirstOrDefaultAsync();
            return model.Ma;
        }

        public async Task<string> del(int id)
        {
            var modelToDel = await _context.Monhockhoas.FindAsync(id);
            _context.Monhockhoas.Remove(modelToDel);
            await _context.SaveChangesAsync();
            return "Xóa thành công !";
        }
        public async Task<string> post(Monhockhoa model)
        {   
            var modelFind = await _context.Monhockhoas
                    .Where( mon => mon.Mahocphan == model.Mahocphan && mon.Khoa == model.Khoa)
                    .FirstOrDefaultAsync();
                    ;
            if(modelFind != null) {
                return $"Môn học này đã tồn tại trong khoa !!";
            }
            _context.Monhockhoas.Add(model);
            await _context.SaveChangesAsync();
            return "Thêm thành công !!";
        }

        public async Task<string> put(Hocphan model)
        {
            var modelToFix = await _context.Hocphans.FindAsync(model.Ma);
            if (modelToFix == null)
            {
                return "Dữ liệu không tồn tại !!";
            }
            modelToFix.Tenhocphan = model.Tenhocphan;
            modelToFix.Ma = model.Ma;
            await _context.SaveChangesAsync();
            return "Sửa thành công !";
        }

        public async Task<List<Monhockhoa> > getfindByName(string khoa, string name)
        {
            return await _context.Monhockhoas
                    .Include( ite => ite.MahocphanNavigation )
                    .Include( ite => ite.KhoaNavigation )
                    .Where( mhk => mhk.KhoaNavigation.Ma == khoa 
                                   &&   
                                   mhk.MahocphanNavigation.Tenhocphan.Contains(name)
                    )
                    .ToListAsync();

        }
    }
}
