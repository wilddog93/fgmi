"use client";

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Users, CreditCard, Award, FileText, Scale, Lock, RefreshCw, Mail } from "lucide-react"
import HeaderPolicy from "../_components/header"
import FooterPolicy from "../_components/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <HeaderPolicy
        title="Terms & Conditions" 
        subTitle="Ketentuan & Syarat Forum Geosaintis Muda Indonesia (FGMI)"
        description="Selamat datang di Forum Geosaintis Muda Indonesia (FGMI)! Dengan menjadi anggota atau mengikuti kegiatan FGMI, berarti kamu setuju untuk menaati ketentuan berikut. Tujuannya sederhana: biar semua kegiatan berjalan lancar, nyaman, dan bermanfaat bagi seluruh geosaintis muda."
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Definitions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="h-6 w-6 text-primary" />
                Definisi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Badge variant="default">FGMI</Badge>
                  <p>
                    Forum Geosaintis Muda Indonesia, organisasi di bawah IAGI yang berfokus pada mahasiswa, fresh
                    graduate, dan geosaintis muda.
                  </p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Badge variant="default">Anggota</Badge>
                  <p>Individu yang telah mendaftar dan membayar iuran membership sesuai level.</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Badge variant="default">Program</Badge>
                  <p>Seluruh kegiatan FGMI, termasuk GEOSC, Bootcamp, Webinar, Workshop, Podcast, Publikasi, dsb.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Membership */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6 text-primary" />
                Keanggotaan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-4">
                  Membership FGMI berlaku per 6 bulan dengan level sebagai berikut:
                </h4>
                <div className="grid gap-4">
                  <div className="border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Basic</Badge>
                      <span className="font-semibold">Rp25.000</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Akses program dasar</p>
                  </div>
                  <div className="border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Intermediate</Badge>
                      <span className="font-semibold">Rp70.000</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Benefit Basic + 4x buletin cetak + 2x majalah cetak</p>
                  </div>
                  <div className="border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">Advance</Badge>
                      <span className="font-semibold">Rp130.000</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Benefit Intermediate + merchandise eksklusif FGMI</p>
                  </div>
                  <div className="border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">Expert</Badge>
                      <span className="font-semibold">Rp200.000</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Benefit Advance + membership card dengan fitur e-money
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm list-disc list-inside">
                <p>Membership bersifat personal dan tidak bisa dipindahtangankan.</p>
                <p>Masa berlaku dihitung sejak tanggal aktivasi pembayaran.</p>
              </div>
            </CardContent>
          </Card>

          {/* Rights & Obligations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Scale className="h-6 w-6 text-primary" />
                Hak & Kewajiban Anggota
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-green-700">Hak Anggota:</h4>
                <ul className="space-y-2 text-sm list-disc list-inside">
                  <li>Mendapatkan benefit sesuai level membership.</li>
                  <li>Mengakses program FGMI (gratis atau berbayar) dengan prioritas tertentu.</li>
                  <li>Mendapatkan sertifikat resmi untuk kegiatan yang diikuti sesuai syarat.</li>
                  <li>Berkesempatan berpartisipasi sebagai volunteer, panitia, atau kolaborator program.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3 text-orange-700">Kewajiban Anggota:</h4>
                <ul className="space-y-2 text-sm list-disc list-inside">
                  <li>Menjaga nama baik FGMI di ruang online maupun offline.</li>
                  <li>
                    Mematuhi etika komunitas, termasuk sikap profesional, saling menghormati, dan tidak
                    menyalahgunakan nama organisasi.
                  </li>
                  <li>Memberikan data yang benar saat pendaftaran dan memperbarui bila ada perubahan.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Programs & Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Award className="h-6 w-6 text-primary" />
                Program & Kegiatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm list-disc list-inside">
                <li>
                  Semua program diumumkan melalui website dan kanal resmi FGMI (Instagram, LinkedIn, WhatsApp
                  community).
                </li>
                <li>Beberapa kegiatan terbuka untuk umum, namun anggota FGMI mendapat prioritas dan harga khusus.</li>
                <li>Pendaftaran program wajib melalui kanal resmi. Form atau jalur tidak resmi tidak diakui.</li>
                <li>FGMI berhak menolak peserta jika tidak memenuhi syarat administrasi, teknis, atau etika.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Payment & Refund */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CreditCard className="h-6 w-6 text-primary" />
                Pembayaran & Refund
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm list-disc list-inside">
                <li>
                  Semua pembayaran dilakukan melalui metode resmi (transfer bank, QRIS, atau gateway pembayaran resmi
                  FGMI).
                </li>
                <li>Biaya membership tidak dapat direfund untuk alasan apapun setelah aktivasi.</li>
                <li>Untuk program berbayar, refund hanya berlaku jika acara dibatalkan oleh FGMI.</li>
                <li>Jika peserta tidak hadir tanpa konfirmasi, biaya tidak dapat dikembalikan.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Certificates & Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Award className="h-6 w-6 text-primary" />
                Sertifikat & Benefit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm list-disc list-inside">
                <li>
                  Sertifikat diberikan hanya untuk peserta yang memenuhi kriteria (misalnya: kehadiran minimal 75%
                  atau menyelesaikan tugas program).
                </li>
                <li>Buletin dan majalah cetak dikirim sesuai jadwal publikasi, alamat pengiriman harus valid.</li>
                <li>Merchandise (polo shirt) untuk level Advance dikirim satu kali per periode.</li>
                <li>Membership card untuk level Expert diproduksi & dikirim setelah aktivasi.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Content & Copyright */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-primary" />
                Konten & Hak Cipta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm list-disc list-inside">
                <li>Semua materi (webinar, bootcamp, publikasi, video, e-learning) dilindungi hak cipta FGMI.</li>
                <li>
                  Anggota dilarang merekam, memperbanyak, atau menyebarkan materi tanpa izin tertulis dari FGMI.
                </li>
                <li>Konten publikasi FGMI boleh dibagikan untuk tujuan edukasi dengan menyebut sumber resmi.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Ethics & Sanctions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Scale className="h-6 w-6 text-primary" />
                Etika & Sanksi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Anggota wajib menjaga profesionalisme, menghargai sesama, dan tidak melakukan tindakan diskriminatif.
              </p>
              <p className="text-sm">
                Penyalahgunaan nama FGMI, plagiarisme, atau perilaku tidak etis lainnya dapat berakibat sanksi.
              </p>
              <div>
                <h4 className="font-semibold mb-2">Sanksi dapat berupa:</h4>
                <ul className="space-y-1 text-sm ml-4 list-disc list-inside">
                  <li>Teguran tertulis</li>
                  <li>Pencabutan hak mengikuti program</li>
                  <li>Pencabutan membership tanpa refund</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Personal Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lock className="h-6 w-6 text-primary" />
                Privasi & Data Pribadi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm list-disc list-inside">
                <li>
                  Data anggota digunakan hanya untuk kepentingan administrasi FGMI dan tidak akan diperjualbelikan.
                </li>
                <li>
                  FGMI dapat menggunakan nama/foto peserta untuk dokumentasi dan publikasi kegiatan dengan tetap
                  menjaga etika.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Terms Changes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <RefreshCw className="h-6 w-6 text-primary" />
                Perubahan Ketentuan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm list-disc list-inside">
                <li>FGMI berhak memperbarui T&C ini sewaktu-waktu.</li>
                <li>Perubahan akan diumumkan melalui website resmi dan media sosial FGMI.</li>
              </ul>
              <FooterPolicy
                className="mt-8"
                title="Butuh Bantuan?" 
                description="Jika ada pertanyaan atau kendala terkait membership atau program, hubungi:"
                actions={
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="mailto:kolaborasi@fgmi.or.id" target="_blank">
                      <Button variant="default">
                        <Mail className="h-4 w-4 mr-2" />
                        Hubungi Support
                      </Button>
                    </Link>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
