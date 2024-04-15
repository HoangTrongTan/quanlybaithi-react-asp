
using Webquanlybaithi.Models;
using Webquanlybaithi.Entities;

namespace Webquanlybaithi.Respositories
{
    public interface IHocPhanRespositories
    {
        public Task<List<Monhockhoa>> all();
        public Task<List<HocPhanDTO>> getByKhoa(string khoa);
        public Task<List<Monhockhoa>> getTenhocPhanByKhoa(string khoa);
        public Task<string> getMaByName(string name);

        public Task<List<Monhockhoa>> getfindByName(string khoa,string name);
        public Task<string> post(Monhockhoa model);

        public Task<string> put(Hocphan model);

        public Task<string> del(int id);
    }
}
