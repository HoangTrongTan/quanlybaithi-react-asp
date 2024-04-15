using Microsoft.EntityFrameworkCore;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Models;
using Webquanlybaithi.Utils;

namespace Webquanlybaithi.Respositories
{
    public class FilesRespositories : IFilesRespositories
    {
        private readonly WebQuanlybaithiContext _context;
        private FilesUtil _filesUtil = new FilesUtil();
        public FilesRespositories(WebQuanlybaithiContext context) {
            _context = context;
        }

        public async Task<string> delete(int id)
        {
            var fileToDel = await _context.FilesUps.FindAsync(id);
            var lydo = await _context.Lydos.FirstOrDefaultAsync(ld => ld.IdFiles == id);
            if (lydo != null)
            {
                _context.Lydos.Remove(lydo);    
            }

            if (fileToDel == null)
            {
                return null;
            }
            _filesUtil.deleteFile(fileToDel.FileUp);
            _context.FilesUps.Remove(fileToDel);
            await _context.SaveChangesAsync();
            return "Xóa Thành công";

        }

        public async Task<string> Fix(FilesUpModel model)
        {
            var objToFix = await _context.FilesUps.FindAsync(model.Id);
            var lydo = await _context.Lydos.FirstOrDefaultAsync( ld => ld.IdFiles == model.Id );
            if (lydo != null)
            {
                _context.Lydos.Remove(lydo);
            }
            if (objToFix == null)
            {
                return null;
            }
            objToFix.Makhoa = model.Makhoa;
            objToFix.IdkhoaDk = model.IdkhoaDk; 
            objToFix.Lop = model.Lop;
            objToFix.Mahocphan = model.Mahocphan;
            objToFix.Makhoa = model.Makhoa;
            objToFix.Duyet = 0;
            var fileName = "";
            if (model.ImageFile != null)
            {
                _filesUtil.deleteFile(objToFix.FileUp);
                fileName = _filesUtil.saveFile(model.ImageFile).ToString();
                objToFix.FileUp = fileName;

            }
            
            await _context.SaveChangesAsync();
            return "Sửa thành công" + fileName;
        }

        public async Task<List<FilesUpModelsEnough>> get(string ma)
        {
            return await _context.FilesUps
                            .Where( file => file.Idgiaovien == ma )
                            .Select( files =>  new FilesUpModelsEnough
                            {
                                Id = files.Id,
                                giaovien = _context.Taikhoans
                                            .Where( tk => tk.Username == files.Idgiaovien )
                                            .Select( tk => tk.Tendangnhap)
                                            .FirstOrDefault(),
                                Khoa = files.MakhoaNavigation.Ten,
                                Khoa_DK = files.IdkhoaDkNavigation.Loai,
                                Lop = files.LopNavigation.Ten, 
                                Mon = files.MahocphanNavigation.Tenhocphan,
                                FilesUp = files.FileUp,
                                thoigian = files.Thoigian,
                                duyet = files.Duyet,
                                chuoiduyet = files.Duyet == 1 ? "Đã duyệt" : (files.Duyet == 2 ? "Không duyệt" : "Chờ duyệt"),
                                lydo = _context.Lydos.Where(ld => ld.IdFiles == files.Id).ToList()
                            })
                            .ToListAsync();
                            
        }

        public async Task<string> post(FilesUpModel model)
        {
            // Lưu tệp vào thư mục uploads
            var fileName = _filesUtil.saveFile(model.ImageFile).ToString();
            //Lưu thông tin vào cơ sở dữ liệu
            var fileRecord = new FilesUp
            {
                Makhoa = model.Makhoa,
                IdkhoaDk = model.IdkhoaDk,
                Lop = model.Lop,
                Mahocphan = model.Mahocphan,
                Thoigian = model.Thoigian,
                FileUp = fileName,
                Idgiaovien = model.Idgiaovien
            };

            _context.FilesUps.Add(fileRecord);
            await _context.SaveChangesAsync();
            return "File uploaded successfully";
        }


        public async Task<List<FilesUpModelsEnough>> all()
        {
            return await _context.FilesUps
                                .Select(ite => new FilesUpModelsEnough
                                {
                                    Id = ite.Id,
                                    giaovien = _context.Taikhoans
                                            .Where(tk => tk.Username == ite.Idgiaovien)
                                            .Select(tk => tk.Tendangnhap)
                                            .FirstOrDefault(),
                                    Khoa = ite.MakhoaNavigation.Ten,
                                    Khoa_DK = ite.IdkhoaDkNavigation.Loai,
                                    Lop = ite.LopNavigation.Ten,
                                    Mon = ite.MahocphanNavigation.Tenhocphan,
                                    FilesUp = ite.FileUp,
                                    thoigian = ite.Thoigian,
                                    duyet = ite.Duyet,
                                    chuoiduyet = ite.Duyet == 1? "Đã duyệt" : ( ite.Duyet == 2 ? "Không duyệt": "Chờ duyệt" ),
                                    lydo = _context.Lydos.Where( ld => ld.IdFiles == ite.Id ).ToList() 
                                }
                                )
                                .ToListAsync();
                ;
        }
        public async Task<List<FilesUp> > getDependsFiles()
        {
            return await _context
                        .FilesUps
                        .Select(ite => new FilesUp
                        {
                            Makhoa = ite.Makhoa,
                            Lop = ite.Lop,
                            IdkhoaDk = ite.IdkhoaDk,
                            Duyet = ite.Duyet,
                            LopNavigation = new Lop
                            {
                                Id = ite.LopNavigation.Id,
                                Ten = ite.LopNavigation.Ten
                            },
                            IdkhoaDkNavigation = new KhoaDk
                            {
                                Loai = ite.IdkhoaDkNavigation.Loai,
                                Id = ite.IdkhoaDkNavigation.Id,
                                Lops = _context.Lops.Where( lp => lp.Id == ite.Lop ).ToList()
                            },
                            MahocphanNavigation = new Hocphan
                            {
                                Ma = ite.MahocphanNavigation.Ma,
                                Tenhocphan = ite.MahocphanNavigation.Tenhocphan
                            },
                            Taikhoan = _context.Taikhoans.FirstOrDefault( tk => tk.Username == ite.Idgiaovien )

                        }
                        )
                        .ToListAsync() ;
        }
        public async Task<string> CheckFiles(List<FilesUpModelsEnough> model)
        {
            int total = 0;

            for (int i = 0; i < model.Count; i++)
            {
                var ite = model[i];
                if(ite.lydo.Count != 0)
                {
                    var objLyDoToXoa = model[i].lydo[0];
                    _context.Lydos.Remove(objLyDoToXoa);
                }

                var iteToFix = await _context.FilesUps.FindAsync(ite.Id);

                if (iteToFix != null)
                {
                    iteToFix.Duyet = ite.duyet;
                    total += 1;
                }
            }

            await _context.SaveChangesAsync();
            return $"{total} mục đã được cập nhật !!";
        }
    }
}
