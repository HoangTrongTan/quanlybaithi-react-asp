using Webquanlybaithi.Entities;
using Webquanlybaithi.Models;

namespace Webquanlybaithi.Respositories
{
    public interface ITaiKhoanRespositories
    {
        public Task<Taikhoan> register(Taikhoan tk);
        public Task<string> get(Taikhoan tk);
        public Task<string[]> getUser(Taikhoan tk);
        public Task<string> changepass(TaiKhoanChangePasss tk);
    }
}
