using Webquanlybaithi.Entities;

namespace Webquanlybaithi.Models
{
    public class FilesUpModelsEnough
    {
        public int Id { get; set; }
        public string giaovien { get; set; }

        public string Khoa { get; set; }

        public int? Khoa_DK { get; set; }

        public string Lop { get; set; }

        public string Mon { get; set; }

        public string FilesUp { get; set;}

        public string? chuoiduyet { get; set; }
        public int? duyet{ get; set; }

        public DateTime? thoigian { get; set;}
        public List<Lydo>? lydo{ get; set; } = new List<Lydo>();
    }
}
