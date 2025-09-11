import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Clock, Package, Mail, AlertTriangle, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"
import HeaderPolicy from "../_components/header"
import FooterPolicy from "../_components/footer"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <HeaderPolicy 
        title="Refund Policy" 
        subTitle="Kebijakan Pengembalian Dana FGMI"
        description="Kami berkomitmen untuk memberikan pengalaman terbaik bagi seluruh anggota dan peserta program. Refund policy ini dibuat agar semua pihak paham aturan terkait pembayaran dan pengembalian dana."
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Membership Fee Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CreditCard className="h-6 w-6 text-primary" />
                Membership Fee
              </CardTitle>
              <CardDescription>Kebijakan pengembalian dana untuk biaya keanggotaan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800 mb-2">Tidak Ada Refund untuk Membership Fee</p>
                    <ul className="space-y-1 text-sm text-red-700 list-disc list-inside">
                      <li>
                        Membership fee tidak dapat direfund setelah pembayaran, apapun level yang dipilih (Basic,
                        Intermediate, Advance, Expert)
                      </li>
                      <li>
                        Membership berlaku 6 bulan penuh sesuai periode, tanpa opsi prorata/refund jika anggota
                        berhenti di tengah periode
                      </li>
                      <li>
                        Membership tidak bisa dinonaktifkan untuk periode berikutnya dan tidak otomatis diperpanjang
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Programs & Events Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Package className="h-6 w-6 text-primary" />
                Program & Event
              </CardTitle>
              <CardDescription>Kebijakan refund untuk Bootcamp, Training, GEOSC, dan program lainnya</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <Badge className="bg-green-100 text-green-800 mb-2">100% Refund</Badge>
                  <p className="text-sm font-medium text-green-800">Program dibatalkan oleh FGMI</p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                  <Badge className="bg-yellow-100 text-yellow-800 mb-2">50% Refund</Badge>
                  <p className="text-sm font-medium text-yellow-800">Pembatalan ≥14 hari sebelum acara</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                  <Badge className="bg-red-100 text-red-800 mb-2">Tidak Ada Refund</Badge>
                  <p className="text-sm font-medium text-red-800">Pembatalan {"<"}14 hari atau tidak hadir</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Ketentuan Detail:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Refund penuh (100%) diberikan jika program dibatalkan oleh FGMI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Refund sebagian (50%) dapat diproses jika peserta membatalkan keikutsertaan ≥14 hari sebelum acara
                      dimulai
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Tidak ada refund jika pembatalan dilakukan {"<"}14 hari sebelum acara atau peserta tidak hadir
                      tanpa konfirmasi
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Biaya administrasi mungkin akan dipotong dari nominal refund</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Merchandise & Benefits Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Package className="h-6 w-6 text-primary" />
                Merchandise & Benefit
              </CardTitle>
              <CardDescription>Kebijakan untuk barang fisik dan benefit keanggotaan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Merchandise Fisik</h4>
                  <p className="text-sm text-muted-foreground mb-2">Polo shirt, membership card, buletin, majalah</p>
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    Tidak dapat direfund
                  </Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Garansi Kualitas</h4>
                  <p className="text-sm text-muted-foreground mb-2">Kerusakan/cacat produksi</p>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Penggantian gratis
                  </Badge>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-800 mb-1">Catatan Penting</p>
                    <p className="text-sm text-amber-700">
                      Kesalahan pengiriman akibat data alamat yang tidak valid bukan tanggung jawab FGMI.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Process Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Clock className="h-6 w-6 text-primary" />
                Proses Refund
              </CardTitle>
              <CardDescription>Langkah-langkah pengajuan pengembalian dana</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    1
                  </div>
                  <h4 className="font-semibold mb-2">Kirim Email</h4>
                  <p className="text-sm text-muted-foreground">
                    Ajukan refund ke mila@fgmi.or.id dengan bukti pembayaran
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    2
                  </div>
                  <h4 className="font-semibold mb-2">Verifikasi</h4>
                  <p className="text-sm text-muted-foreground">
                    Tim akan memverifikasi kelengkapan dokumen dan ketentuan
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    3
                  </div>
                  <h4 className="font-semibold mb-2">Pencairan</h4>
                  <p className="text-sm text-muted-foreground">Refund diproses dalam 7-14 hari kerja</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-800 mb-2">Informasi Kontak Refund</p>
                    <p className="text-sm text-blue-700 mb-1">Email: mila@fgmi.or.id</p>
                    <p className="text-sm text-blue-700">Sertakan bukti pembayaran dan alasan pengajuan refund</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Detail Proses:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Proses refund memakan waktu 7-14 hari kerja setelah verifikasi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Refund akan dikirim melalui metode pembayaran yang sama saat pendaftaran (transfer bank/QRIS)
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <AlertTriangle className="h-6 w-6 text-primary" />
                Catatan Penting
              </CardTitle>
              <CardDescription>Ketentuan umum yang perlu diperhatikan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 border rounded-lg">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong>Hak Penolakan:</strong> FGMI berhak menolak pengajuan refund yang tidak sesuai ketentuan
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong>Persetujuan Otomatis:</strong> Dengan melakukan pembayaran, anggota/peserta dianggap
                        sudah membaca dan menyetujui kebijakan refund ini
                      </span>
                    </li>
                  </ul>
                </div>

                <FooterPolicy 
                  title="Butuh Bantuan?" 
                  description="Jika Anda memiliki pertanyaan lebih lanjut tentang kebijakan refund, jangan ragu untuk menghubungi kami."
                  actions={
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="mailto:kolaborasi@fgmi.or.id" target="_blank">
                        <Button className="bg-primary hover:bg-primary/90">
                          <Mail className="h-4 w-4 mr-2" />
                          Hubungi Support
                        </Button>
                      </Link>
                    </div>
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
