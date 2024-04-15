using System.IO;
using Webquanlybaithi.Entities;

namespace Webquanlybaithi.Respositories
{
    public class LyDoRespositories : ILyDoRespositories
    {
        private readonly WebQuanlybaithiContext _context;
        public LyDoRespositories(WebQuanlybaithiContext context) {
            this._context = context;
        }
        public async Task<string> delete(int id)
        {
            var fileToDel = await _context.Lydos.FindAsync(id);
            _context.Lydos.Remove(fileToDel);
            await _context.SaveChangesAsync();
            return "Xóa Thành công";

        }

        public async Task<string> post(Lydo lydo)
        {
            _context.Lydos.Add(lydo);
            await _context.SaveChangesAsync();
            return "thêm thành công";
        }

        public async Task<string> put(Lydo lydo)
        {
            var objToFix = await _context.Lydos.FindAsync(lydo.Id);
            if (objToFix == null)
            {
                return null;
            }
            objToFix.Noidung = lydo.Noidung;
            await _context.SaveChangesAsync();
            return "Sửa thành công";
        }
    }
}
