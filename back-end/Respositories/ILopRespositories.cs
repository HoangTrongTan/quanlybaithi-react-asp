using Microsoft.AspNetCore.Mvc;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Models;

namespace Webquanlybaithi.Respositories
{
    public interface ILopRespositories
    {
        public Task<List<Lop>> all();
        public Task<List<Lop>> getByMa(int khoadk);

        public Task<int> getIdByName(int dk,string name);

        public Task<List<Lop>> getLopWithKhoaDk();

        public Task<string> post(Lop model);

        public Task<string> put(Lop model);

        public Task<string> del(int ma);
        public Task<string> del(List<Lop> list);

    }
}
