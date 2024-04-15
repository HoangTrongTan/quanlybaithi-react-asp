using Webquanlybaithi.Entities;

namespace Webquanlybaithi.Respositories
{
    public interface ILyDoRespositories
    {
        public Task<string> post(Lydo lydo);
        public Task<string> put(Lydo lydo);
        public Task<string> delete(int id);
    }
}
