using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Models;

namespace Webquanlybaithi.Respositories
{
    public class MonHocKhoaRespositories : IMonHocKhoaRespositories
    {
        private readonly WebQuanlybaithiContext _context;
        public MonHocKhoaRespositories(WebQuanlybaithiContext ctx)
        {
            _context = ctx;
        }
        public Task<List<Hocphan>> all()
        {
            return _context.Hocphans
                            .Include(
                                hp => hp.Monhockhoas
                             )
                            .Select(
                                hp => new Hocphan
                                {
                                    Ma = hp.Ma,
                                    Tenhocphan = hp.Tenhocphan,
                                    Monhockhoas = hp.Monhockhoas
                                                    .Select(
                                                        mhk => new Monhockhoa
                                                        {
                                                            Id = mhk.Id,
                                                            Mahocphan = mhk.Mahocphan,
                                                            Khoa = mhk.Khoa,
                                                            KhoaNavigation = mhk.KhoaNavigation,
                                                        }
                                                     )
                                                    .ToList()
                                }
                            )
                            .ToListAsync();
        }
        public async Task<string> del(List<HocPhanDTO> model)
        {
            model.ForEach(hp =>
            {
                var listTodel =   _context.Monhockhoas.Where(m => m.Mahocphan == hp.MA).ToList(); 
                if(listTodel != null)
                {
                    _context.Monhockhoas.RemoveRange(listTodel);         
                }
                var hocphanToDel = _context.Hocphans.FirstOrDefault( ite => ite.Ma == hp.MA );
                _context.Hocphans.Remove(hocphanToDel); 
            });

            await _context.SaveChangesAsync();
            return "Xóa thành công !!";
        }
        public async Task<string> del(string ma)
        {
            var listHocPhanByKhoa = await _context.Monhockhoas.Where(
                    mhk => mhk.Mahocphan == ma
                )
                .ToListAsync();
            if(listHocPhanByKhoa != null)
            {
                _context.Monhockhoas.RemoveRange(listHocPhanByKhoa);
            }

            var modelToDel = await _context.Hocphans.FindAsync(ma);
            _context.Hocphans.Remove(modelToDel);
            await _context.SaveChangesAsync();
            return "Xóa thành công !";
        }

        public async Task<List<Hocphan>> findName(string name)
        {
            return await _context.Hocphans
                .Where( hp => hp.Tenhocphan.Contains(name) )
                .ToListAsync();
        }

        public async Task<string> post(Hocphan model)
        {
            var item = await _context.Hocphans.FirstOrDefaultAsync(hp => hp.Ma == model.Ma || hp.Tenhocphan.Contains(model.Tenhocphan) ) ;
            if(item != null)
            {
                return "unique";
            }
            _context.Hocphans.Add(model);
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
            modelToFix.Ma = model.Ma;
            modelToFix.Tenhocphan = model.Tenhocphan;
            await _context.SaveChangesAsync();
            return "Sửa thành công !";
        }
    }
}
