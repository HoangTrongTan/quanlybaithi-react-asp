using Webquanlybaithi.Entities;
using Webquanlybaithi.Models;

namespace Webquanlybaithi.Respositories
{
    public interface IFilesRespositories
    {
        public Task<List<FilesUpModelsEnough>> get(string ma);

        public Task<List<FilesUpModelsEnough>> all();
        public Task<string> post(FilesUpModel file);

        public Task<string> delete(int id);

        public Task<string> Fix(FilesUpModel model);

        public Task<string> CheckFiles(List<FilesUpModelsEnough> model);
        public Task<List<FilesUp>> getDependsFiles();
    }
}
