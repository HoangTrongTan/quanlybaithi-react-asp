using Webquanlybaithi.Entities;

namespace Webquanlybaithi.Respositories
{
    public interface IKhoaDKRespositories
    {
        public Task<List<KhoaDk>> getAll();
        public Task<List<KhoaDk>> getkHOAbyMa(string ma);

        public Task<int?> getIdByLoai(int loai,string ma);

        public Task<string> post(KhoaDk model);

        public Task<string> put(KhoaDk model);

        public Task<string> del(int ma);

        public Task<string > delfile(List<KhoaDk> list);

        public Task<string> delLop(List<KhoaDk> list);
    }
}
