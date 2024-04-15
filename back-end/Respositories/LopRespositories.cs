 using Microsoft.EntityFrameworkCore;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Models;
using Webquanlybaithi.Utils;

namespace Webquanlybaithi.Respositories
{
    public class LopRespositories : ILopRespositories
    {
        private readonly WebQuanlybaithiContext _context;
        private FilesUtil filesUtil = new FilesUtil();
        public LopRespositories(WebQuanlybaithiContext ctx)
        {
            _context = ctx;
        }
        public async Task<List<Lop>> all()
        {
            return await _context.Lops.ToListAsync();
        }

        public async Task<List<Lop>> getByMa(int khoadk)
        {
            return await _context.Lops!.Where( lop => lop.KhoaDk == khoadk).ToListAsync();
        }

        public async Task<int> getIdByName(int dk, string name)
        {
            var objLop = await _context.Lops
                                        .Where( lop => lop.KhoaDk == dk && lop.Ten.Contains(name) ).FirstOrDefaultAsync();
            return objLop.Id;
        }
        public async Task<string> del(int ma)
        {
            var lopFilesDel = _context.FilesUps.FirstOrDefault(lopfile => lopfile.Lop == ma);
            if (lopFilesDel != null)
            {
                var LyDo = _context.Lydos.FirstOrDefault(ld => ld.IdFiles == lopFilesDel.Id);
                if(LyDo != null)
                {
                    _context.Lydos.Remove(LyDo);
                }
                filesUtil.deleteFile(lopFilesDel.FileUp);
                _context.FilesUps.Remove(lopFilesDel);
            }
            var modelToDel = await _context.Lops.FindAsync(ma);
            _context.Lops.Remove(modelToDel);
            await _context.SaveChangesAsync();
            return "Xóa thành công !";
        }
        public async Task<string> del(List<Lop> list)
        {
            //tầng lớp
            var strCount = new int[] { 0, 0};
            list.ForEach(lop =>
            {
                strCount[0] += 1;
                //tầng file
                var listFiles = _context.FilesUps.Where(fl => fl.Lop == lop.Id).ToList();
                if(listFiles.Count != 0)
                {
                    listFiles.ForEach(fl =>
                    {
                        //tầng lý do
                        var lydo = _context.Lydos.FirstOrDefault(ld => ld.IdFiles == fl.Id);
                        if(lydo != null)
                        {
                            _context.Lydos.Remove(lydo);
                        }

                    });
                    listFiles.ForEach(lsf =>
                    {
                        filesUtil.deleteFile(lsf.FileUp);
                        _context.FilesUps.Remove(lsf);
                    });

                    strCount[1] += listFiles.Count();
                }
                

                var lopTodel = _context.Lops.FirstOrDefault(iteLop => iteLop.Ma == lop.Ma);
                _context.Lops.Remove(lopTodel);
            });
            await _context.SaveChangesAsync();
            return "Xóa thành công " + strCount[0].ToString() + " lớp, " + strCount[1] +" files";
        }
        public async Task<string> post(Lop model)
        {
            _context.Lops.Add(model);
            await _context.SaveChangesAsync();
            return "Thêm thành công !!";
        }

        public async Task<string> put(Lop model)
        {
            var modelToFix = await _context.Lops.FindAsync(model.Id);
            if (modelToFix == null)
            {
                return "Dữ liệu không tồn tại !!";
            }
            modelToFix.Ten = model.Ten;
            modelToFix.Ma = model.Ma;
            modelToFix.KhoaDk = model.KhoaDk;
            await _context.SaveChangesAsync();
            return "Sửa thành công !";
        }

        public async Task<List<Lop>> getLopWithKhoaDk()
        {
            var lopList = await _context.Lops
                                        .Include(lop => lop.KhoaDkNavigation)
                                        .Select(lop => new Lop
                                            {
                                                Id = lop.Id,
                                                Ten = lop.Ten,
                                                Ma = lop.Ma,
                                                KhoaDk = lop.KhoaDk,
                                                KhoaDkNavigation = new KhoaDk
                                                {
                                                    Id = lop.KhoaDkNavigation.Id,
                                                    Loai = lop.KhoaDkNavigation.Loai,
                                                    Ma = lop.KhoaDkNavigation.Ma,
                                                    MaNavigation = new Khoa
                                                    {
                                                        Ten = lop.KhoaDkNavigation.MaNavigation.Ten,
                                                    }
                                                },
                         
                                            }
                                        )
                                        .ToListAsync();
            return lopList;
        }
    }
}
