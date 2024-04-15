using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Webquanlybaithi.Entities;

public partial class FilesUp
{
    public int Id { get; set; }

    public string Makhoa { get; set; } = null!;

    public int? IdkhoaDk { get; set; }

    public int? Lop { get; set; }

    public string? Mahocphan { get; set; }

    public string? FileUp { get; set; }

    public int? Duyet { get; set; }

    public DateTime? Thoigian { get; set; }

    public string? Idgiaovien { get; set; }

    [NotMapped]
    public Taikhoan? Taikhoan { get; set; }

    public virtual KhoaDk? IdkhoaDkNavigation { get; set; }

    public virtual Lop? LopNavigation { get; set; }

    public virtual ICollection<Lydo> Lydos { get; set; } = new List<Lydo>();

    public virtual Hocphan? MahocphanNavigation { get; set; }

    public virtual Khoa MakhoaNavigation { get; set; } = null!;
}
