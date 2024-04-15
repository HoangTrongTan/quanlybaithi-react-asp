using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Webquanlybaithi.Entities;

public partial class WebQuanlybaithiContext : DbContext
{
    public WebQuanlybaithiContext()
    {
    }

    public WebQuanlybaithiContext(DbContextOptions<WebQuanlybaithiContext> options)
        : base(options)
    {
    }

    public virtual DbSet<FilesUp> FilesUps { get; set; }

    public virtual DbSet<Hocphan> Hocphans { get; set; }

    public virtual DbSet<Khoa> Khoas { get; set; }

    public virtual DbSet<KhoaDk> KhoaDks { get; set; }

    public virtual DbSet<Lop> Lops { get; set; }

    public virtual DbSet<Lydo> Lydos { get; set; }

    public virtual DbSet<Monhockhoa> Monhockhoas { get; set; }

    public virtual DbSet<Taikhoan> Taikhoans { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=TANTINY;Database=WebQuanlybaithi;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FilesUp>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__FILES_UP__3214EC275E67AB64");

            entity.ToTable("FILES_UP");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Duyet)
                .HasDefaultValueSql("((0))")
                .HasColumnName("DUYET");
            entity.Property(e => e.FileUp)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("FILE_UP");
            entity.Property(e => e.Idgiaovien)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("IDGIAOVIEN");
            entity.Property(e => e.IdkhoaDk).HasColumnName("IDKHOA_DK");
            entity.Property(e => e.Lop).HasColumnName("LOP");
            entity.Property(e => e.Mahocphan)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("MAHOCPHAN");
            entity.Property(e => e.Makhoa)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("MAKHOA");
            entity.Property(e => e.Thoigian)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("THOIGIAN");

            entity.HasOne(d => d.IdkhoaDkNavigation).WithMany(p => p.FilesUps)
                .HasForeignKey(d => d.IdkhoaDk)
                .HasConstraintName("FK__FILES_UP__IDKHOA__3E52440B");

            entity.HasOne(d => d.LopNavigation).WithMany(p => p.FilesUps)
                .HasForeignKey(d => d.Lop)
                .HasConstraintName("FK__FILES_UP__LOP__403A8C7D");

            entity.HasOne(d => d.MahocphanNavigation).WithMany(p => p.FilesUps)
                .HasForeignKey(d => d.Mahocphan)
                .HasConstraintName("FK__FILES_UP__MAHOCP__3F466844");

            entity.HasOne(d => d.MakhoaNavigation).WithMany(p => p.FilesUps)
                .HasForeignKey(d => d.Makhoa)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FILES_UP__MAKHOA__412EB0B6");
        });

        modelBuilder.Entity<Hocphan>(entity =>
        {
            entity.HasKey(e => e.Ma).HasName("PK__HOCPHAN__3214CCBF240226C6");

            entity.ToTable("HOCPHAN");

            entity.Property(e => e.Ma)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("MA");
            entity.Property(e => e.Tenhocphan)
                .HasMaxLength(250)
                .HasColumnName("TENHOCPHAN");
        });

        modelBuilder.Entity<Khoa>(entity =>
        {
            entity.HasKey(e => e.Ma).HasName("MyPrimaryKey");

            entity.ToTable("KHOA");

            entity.Property(e => e.Ma)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("MA");
            entity.Property(e => e.Ten)
                .HasMaxLength(200)
                .HasColumnName("TEN");
        });

        modelBuilder.Entity<KhoaDk>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__KHOA_DK__3214EC27C9FFA67E");

            entity.ToTable("KHOA_DK");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Loai).HasColumnName("LOAI");
            entity.Property(e => e.Ma)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("MA");

            entity.HasOne(d => d.MaNavigation).WithMany(p => p.KhoaDks)
                .HasForeignKey(d => d.Ma)
                .HasConstraintName("FK__KHOA_DK__MA__47DBAE45");
        });

        modelBuilder.Entity<Lop>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LOP__3214EC27055690EC");

            entity.ToTable("LOP");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.KhoaDk).HasColumnName("KHOA_DK");
            entity.Property(e => e.Ma)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("MA");
            entity.Property(e => e.Ten)
                .HasMaxLength(100)
                .HasColumnName("TEN");

            entity.HasOne(d => d.KhoaDkNavigation).WithMany(p => p.Lops)
                .HasForeignKey(d => d.KhoaDk)
                .HasConstraintName("FK__LOP__KHOA_DK__49C3F6B7");
        });

        modelBuilder.Entity<Lydo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LYDO__3214EC27AC4D0F9E");

            entity.ToTable("LYDO");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdFiles).HasColumnName("ID_FILES");
            entity.Property(e => e.Noidung)
                .HasMaxLength(250)
                .HasColumnName("NOIDUNG");

            entity.HasOne(d => d.IdFilesNavigation).WithMany(p => p.Lydos)
                .HasForeignKey(d => d.IdFiles)
                .HasConstraintName("FK__LYDO__ID_FILES__6EF57B66");
        });

        modelBuilder.Entity<Monhockhoa>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MONHOCKH__3214EC272BDF9CA9");

            entity.ToTable("MONHOCKHOA");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Khoa)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("KHOA");
            entity.Property(e => e.Mahocphan)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("MAHOCPHAN");

            entity.HasOne(d => d.KhoaNavigation).WithMany(p => p.Monhockhoas)
                .HasForeignKey(d => d.Khoa)
                .HasConstraintName("FK__MONHOCKHOA__KHOA__4F7CD00D");

            entity.HasOne(d => d.MahocphanNavigation).WithMany(p => p.Monhockhoas)
                .HasForeignKey(d => d.Mahocphan)
                .HasConstraintName("FK__MONHOCKHO__MAHOC__4E88ABD4");
        });

        modelBuilder.Entity<Taikhoan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TAIKHOAN__3214EC279158398E");

            entity.ToTable("TAIKHOAN");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Chucvuloai)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("CHUCVULOAI");
            entity.Property(e => e.Idkhoadk).HasColumnName("IDKHOADK");
            entity.Property(e => e.Idlop).HasColumnName("IDLOP");
            entity.Property(e => e.Makhoa)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("MAKHOA");
            entity.Property(e => e.Tendangnhap)
                .HasMaxLength(250)
                .HasColumnName("TENDANGNHAP");
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("USERNAME");
            entity.Property(e => e.UserpassHash)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("USERPASS_HASH");
            entity.Property(e => e.UserpassSalt)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("USERPASS_SALT");

            entity.HasOne(d => d.IdkhoadkNavigation).WithMany(p => p.Taikhoans)
                .HasForeignKey(d => d.Idkhoadk)
                .HasConstraintName("FK__TAIKHOAN__IDKHOA__571DF1D5");

            entity.HasOne(d => d.IdlopNavigation).WithMany(p => p.Taikhoans)
                .HasForeignKey(d => d.Idlop)
                .HasConstraintName("FK__TAIKHOAN__IDLOP__5812160E");

            entity.HasOne(d => d.MakhoaNavigation).WithMany(p => p.Taikhoans)
                .HasForeignKey(d => d.Makhoa)
                .HasConstraintName("FK__TAIKHOAN__MAKHOA__5629CD9C");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
