using Webquanlybaithi.Entities;

namespace Webquanlybaithi.Responsitories
{
    public interface IKhoaRespositories
    {
        public Task<List<Khoa>> getAll();

        public Task<string> post(Khoa model);

        public Task<string> put(Khoa model);

        public Task<string> del(string ma);

        public Task<string> delfile(List<Khoa> list);
        public Task<string> dellop(List<Khoa> list);
    }
}
