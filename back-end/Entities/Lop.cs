using System;
using System.Collections.Generic;

namespace Webquanlybaithi.Entities;

public partial class Lop
{
    public int Id { get; set; }

    public string? Ten { get; set; }

    public string? Ma { get; set; }

    public int? KhoaDk { get; set; }

    public virtual ICollection<FilesUp>? FilesUps { get; set; } = new List<FilesUp>();

    public virtual KhoaDk? KhoaDkNavigation { get; set; }

    public virtual ICollection<Taikhoan>? Taikhoans { get; set; } = new List<Taikhoan>();
}
