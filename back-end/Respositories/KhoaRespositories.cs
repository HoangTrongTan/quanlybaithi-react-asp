using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Responsitories;
using Webquanlybaithi.Utils;

namespace Webquanlybaithi.Respositories
{
    public class KhoaRespositories : IKhoaRespositories
    {
        private readonly WebQuanlybaithiContext _context;
        private FilesUtil filesUtil = new FilesUtil();
        public KhoaRespositories(WebQuanlybaithiContext context)
        {
            _context = context;
        }

        public async Task<string> del(string ma)
        {
            var modelToDel = await _context.Khoas.FindAsync(ma);
            _context.Khoas.Remove(modelToDel);
            await _context.SaveChangesAsync();
            return "Xóa thành công !";
        }
        public async Task<string> delfile(List<Khoa> list)
        {
            int count = 0;
            list.ForEach(k =>
            {
                var listFile = _context.FilesUps.Where( fl => fl.Makhoa == k.Ma ).ToList();
                if(listFile != null)
                {

                    listFile.ForEach(ite =>
                    {
                        var lydo = _context.Lydos.FirstOrDefault(ld => ld.IdFiles == ite.Id);
                        if(lydo != null)
                        {
                            _context.Lydos.Remove(lydo);
                        }
                        _context.FilesUps.Remove(ite);
                        count += 1;
                        filesUtil.deleteFile(ite.FileUp);
                    });
                }
            });
            await _context.SaveChangesAsync();
            return $" Xóa {count} file ";
        }
        public async Task<string> dellop(List<Khoa> list)
        {
            var count = new int[] {0,0, 0, 0 , 0};
            list.ForEach(k =>
            {
                var listKhoaDk = _context.KhoaDks.Where(dk => dk.Ma == k.Ma).ToList();
                if (listKhoaDk != null)
                {
                    listKhoaDk.ForEach(dk =>
                    {
                        var loplist = _context.Lops.Where(l => l.KhoaDk ==  dk.Id);
                        if(loplist != null)
                        {
                            _context.Lops.RemoveRange(loplist);
                            count[0] += loplist.Count();
                        }
                        _context.KhoaDks.Remove(dk);
                        count[1] += 1;
                    });
                }
                var listMon = _context.Monhockhoas.Where(mon => mon.Khoa == k.Ma).ToList();
                if (listMon != null)
                {
                    _context.Monhockhoas.RemoveRange(listMon);
                    count[3] += listMon.Count();
                }
                var listTaikhoan = _context.Taikhoans.Where(t => t.Makhoa == k.Ma ).ToList();
                if(listTaikhoan != null)
                {
                    _context.Taikhoans.RemoveRange(listTaikhoan);
                    count[4] += listTaikhoan.Count();
                }
                count[2] += 1;
            });
            _context.Khoas.RemoveRange(list);
            await _context.SaveChangesAsync();
            return $" xóa {count[0]} lớp, {count[1]} khóa , {count[2]} khoa, {count[3]} môn, {count[4]} tài khoản !!";
        }
        public async Task<List<Khoa>> getAll()
        {
           return await _context
                         .Khoas
                         .Select( k => new Khoa
                         {
                             Ma = k.Ma,
                             Ten = k.Ten,
                             KhoaDks = _context
                                        .KhoaDks
                                        .Where( khoadk => khoadk.Ma == k.Ma)
                                        .ToList(),
                             Taikhoans = _context
                                        .Taikhoans
                                        .Where( tk => tk.Makhoa == k.Ma )
                                        .ToList(),
                         } )
                         .ToListAsync();
        }

        public async Task<string> post(Khoa model)
        {
            _context.Khoas.Add(model);
            await _context.SaveChangesAsync();
            return "Thêm thành công !!";
        }

        public async Task<string> put(Khoa model)
        {
            var modelToFix = await _context.Khoas.FindAsync(model.Ma);
            if(modelToFix == null)
            {
                return "Dữ liệu không tồn tại !!";
            }
            modelToFix.Ma = model.Ma;
            modelToFix.Ten = model.Ten;
            await _context.SaveChangesAsync();
            return "Sửa thành công !";
        }
    }
}
