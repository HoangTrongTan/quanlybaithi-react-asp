using System.ComponentModel.DataAnnotations.Schema;

namespace Webquanlybaithi.Models
{
    public class FilesUpModel
    {
        public int? Id { get; set; }

        public string Makhoa { get; set; }

        public int? IdkhoaDk { get; set; }

        public int? Lop { get; set; }

        public string? Mahocphan { get; set; }

        public string? FileUp { get; set; }

        public int? Duyet { get; set; }

        public DateTime? Thoigian { get; set; }

        public IFormFile? ImageFile { get; set; }

        public string? Idgiaovien { get; set; }
    }
}
