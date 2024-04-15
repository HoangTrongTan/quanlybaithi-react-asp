using Webquanlybaithi.Entities;
using Webquanlybaithi.Models;

namespace Webquanlybaithi.Respositories
{
    public interface IMonHocKhoaRespositories
    {
        public Task<List<Hocphan>> all();
        public Task<List<Hocphan>> findName(string name);
        public Task<string> post(Hocphan model);

        public Task<string> put(Hocphan model);

        public Task<string> del(string ma);

        public Task<string> del(List<HocPhanDTO> model);
    }
}
