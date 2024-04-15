using Microsoft.EntityFrameworkCore;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Utils;

namespace Webquanlybaithi.Respositories
{
    public class KhoaDkRespositories : IKhoaDKRespositories
    {
        private readonly WebQuanlybaithiContext _context;
        private FilesUtil _filesUtil = new FilesUtil();
        public KhoaDkRespositories(WebQuanlybaithiContext context)
        {
            _context = context;
        }

        public async Task<List<KhoaDk>> getAll()
        {
            return await _context.KhoaDks
                 .Include(dk => dk.MaNavigation)
                 .Select(dk => new KhoaDk
                     {
                        Id = dk.Id,
                        Loai = dk.Loai,
                        Ma = dk.Ma,
                        MaNavigation = new Khoa
                        {
                            Ma = dk.MaNavigation.Ma,
                            Ten = dk.MaNavigation.Ten,
                        },
                        Lops = _context.Lops.Where( ite => ite.KhoaDk == dk.Id ).ToList()
                     }
                 )
                 .ToListAsync();
        }

        public async Task<int?> getIdByLoai(int loai, string ma)
        {
            var Khoadk = await _context.KhoaDks.Where(dk => dk.Loai == loai && dk.Ma == ma).FirstOrDefaultAsync();
            return Khoadk.Id;
        }

        public async Task<List<KhoaDk>> getkHOAbyMa(string ma)
        {
            return await _context.KhoaDks.Where( kh => kh.Ma == ma).ToListAsync();
        }
        public async Task<string> del(int ma)
        {
            var modelToDel = await _context.KhoaDks.FindAsync(ma);
            _context.KhoaDks.Remove(modelToDel);
            await _context.SaveChangesAsync();
            return "Xóa thành công !";
        }
        public async Task<string > delfile(List<KhoaDk> list)
        {

            var strCount = 0;
            //cấp khóa
            list.ForEach(khoadk =>
            {
                //cấp file
                var listFile = _context.FilesUps.Where( fl => fl.IdkhoaDk == khoadk.Id).ToList();
                if(listFile != null)
                {
                    //Xóa lý do
                    listFile.ForEach(fl =>
                    {
                        var lydo = _context.Lydos.FirstOrDefault( ld => ld.IdFiles == fl.Id );
                        if(lydo != null)
                        {
                            _context.Lydos.Remove(lydo);
                        }
                    });
                    listFile.ForEach(fl =>
                    {
                        _filesUtil.deleteFile(fl.FileUp);
                        _context.FilesUps.Remove(fl);
                    });
                    strCount += listFile.Count();
                }      
            });
            await _context.SaveChangesAsync();
            return $" Xóa thành công {strCount} file !!";
        }
        public async Task<string> delLop(List<KhoaDk> list)
        {
            var strCount = new int[] { 0, 0 };
            //cấp khóa
            list.ForEach(khoadk =>
            {
                var listLops = _context.Lops.Where(lop => lop.KhoaDk == khoadk.Id);
                if(listLops != null)
                {
                    _context.Lops.RemoveRange(listLops);
                    strCount[0] += listLops.Count();
                }
                _context.KhoaDks.Remove(khoadk);
                strCount[1] += 1;
            });
            await _context.SaveChangesAsync();
            return $" xóa {strCount[0]} lớp, {strCount[1]} khóa !!";
        }
        public async Task<string> post(KhoaDk model)
        {
            _context.KhoaDks.Add(model);
            await _context.SaveChangesAsync();
            return "Thêm thành công !!";
        }

        public async Task<string> put(KhoaDk model)
        {
            var modelToFix = await _context.KhoaDks.FindAsync(model.Id);
            if (modelToFix == null)
            {
                return "Dữ liệu không tồn tại !!";
            }
            modelToFix.Loai = model.Loai;
            modelToFix.Ma = model.Ma;
            await _context.SaveChangesAsync();
            return "Sửa thành công !";
        }
        
    }
}
 