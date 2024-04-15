using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Webquanlybaithi.Entities;

public partial class Khoa
{
    public string Ma { get; set; } = null!;

    public string? Ten { get; set; }


    public virtual ICollection<FilesUp> FilesUps { get; set; } = new List<FilesUp>();

    public virtual ICollection<KhoaDk> KhoaDks { get; set; } = new List<KhoaDk>();

    public virtual ICollection<Monhockhoa> Monhockhoas { get; set; } = new List<Monhockhoa>();

    public virtual ICollection<Taikhoan> Taikhoans { get; set; } = new List<Taikhoan>();
}
