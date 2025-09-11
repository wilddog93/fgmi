import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Handshake, Mail, Phone, Globe, Instagram, Linkedin, Youtube, Book, Notebook, FileText } from "lucide-react"
import Link from "next/link"
import { FaCogs, FaQuestion } from "react-icons/fa"
import HeaderPolicy from "../_components/header"
import FooterPolicy from "../_components/footer"

export default function FAQPage() {
  return (
    <div className="bg-background">
      {/* Header Section */}
      <HeaderPolicy 
        title="Frequently Asked Questions" 
        subTitle="FGMI Kolaborasi – Wadah Kolaborasi Geosaintis Muda Indonesia"
        description="Forum ini mempertemukan para geosaintis muda melalui kolaborasi, berbagi pengetahuan, dan berbagai program keberlanjutan."
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Navigation */}
        <div className="w-full flex items-center gap-4 pb-4 mb-8 overflow-x-auto">
          <Link href="#about">
            <Card className="w-full min-w-[250px] text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <Book className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Tentang FGMI</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="#membership">
            <Card className="w-full min-w-[250px] text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Keanggotaan</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="#program">
            <Card className="w-full min-w-[250px] text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Program</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="#collaboration">
            <Card className="w-full min-w-[250px] text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <Handshake className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Kolaborasi</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="#administrations">
            <Card className="w-full min-w-[250px] text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <FaCogs className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Administrasi</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="#others">
            <Card className="w-full min-w-[250px] text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <FaQuestion className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Pertanyaan Lainnya</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="#contact">
            <Card className="w-full min-w-[250px] text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Kontak</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {/* About FGMI Section */}
          <Card id="about" className="scroll-mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Book className="h-6 w-6 text-primary" />
                Tentang FGMI
              </CardTitle>
              <CardDescription>Informasi dasar tentang Forum Geosaintis Muda Indonesia</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-fgmi">
                  <AccordionTrigger>Apa itu FGMI?</AccordionTrigger>
                  <AccordionContent>
                    FGMI (Forum Geosaintis Muda Indonesia) adalah organisasi resmi di bawah Ikatan Ahli Geologi
                    Indonesia (IAGI) yang menjadi wadah bagi mahasiswa, fresh graduate, dan geosaintis muda untuk
                    berkolaborasi, belajar, serta berkembang di bidang kebumian.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="difference-iagi">
                  <AccordionTrigger>Apa bedanya FGMI dengan IAGI?</AccordionTrigger>
                  <AccordionContent>
                    IAGI adalah organisasi profesi geologi tingkat nasional, sedangkan FGMI adalah sayap khusus yang
                    berfokus pada pengembangan generasi muda geosaintis. FGMI juga mengelola SM-IAGI (Seksi Mahasiswa
                    IAGI) dan program kolaborasi antar mahasiswa serta early-career geoscientist.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="who-can-join">
                  <AccordionTrigger>Siapa saja yang bisa bergabung?</AccordionTrigger>
                  <AccordionContent>
                    Mahasiswa geosains, fresh graduate, dan geosaintis muda (umumnya {"<"}35 tahun) dapat menjadi bagian
                    dari FGMI.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="core-values">
                  <AccordionTrigger>Apa core values FGMI?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary">Ekstraksi</Badge>
                        <span>Penguasaan ilmu eksplorasi dan pemanfaatan sumber daya bumi</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary">Konservasi</Badge>
                        <span>Menjaga warisan geologi dan lingkungan</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary">Mitigasi</Badge>
                        <span>Kesiapsiagaan menghadapi bencana geologi untuk keselamatan masyarakat</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Membership Section */}
          <Card id="membership" className="scroll-mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6 text-primary" />
                Keanggotaan & Benefit
              </CardTitle>
              <CardDescription>Informasi tentang cara bergabung dan keuntungan menjadi anggota</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="how-to-join">
                  <AccordionTrigger>Bagaimana cara menjadi anggota FGMI?</AccordionTrigger>
                  <AccordionContent>
                    Pendaftaran dilakukan melalui formulir resmi di website fgmi.or.id atau melalui SM-IAGI di
                    masing-masing universitas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="benefits">
                  <AccordionTrigger>Apa keuntungan jadi anggota FGMI?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Akses prioritas ke berbagai pelatihan, bootcamp, dan webinar</li>
                      <li>Jaringan profesional dengan geosaintis muda di seluruh Indonesia</li>
                      <li>Kesempatan terlibat dalam event nasional dan internasional</li>
                      <li>Sertifikat keanggotaan & partisipasi program FGMI</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="membership-fee">
                  <AccordionTrigger>Apakah keanggotaan berbayar?</AccordionTrigger>
                  <AccordionContent>
                    Saat ini keanggotaan FGMI bersifat berbayar, lebih lanjut dapat diakses melalui halaman Membership.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="student-eligibility">
                  <AccordionTrigger>Apakah mahasiswa bisa bergabung atau hanya lulusan?</AccordionTrigger>
                  <AccordionContent>
                    Mahasiswa, fresh graduate, maupun early-career geoscientist semua bisa bergabung.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Programs Section */}
          <Card id="program" className="scroll-mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <BookOpen className="h-6 w-6 text-primary" />
                Program Organisasi
              </CardTitle>
              <CardDescription>Program-program utama yang diselenggarakan FGMI</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="main-programs">
                  <AccordionTrigger>Apa saja program utama FGMI?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Conference & Competition</h4>
                        <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                          <li>GEOSC (Geoscience Student Competition & Conference) sebagai flagship event tahunan</li>
                          <li>Student Competition (paper competition, poster, geoscience quiz, case study)</li>
                          <li>Plenary & parallel session dengan akademisi, praktisi, dan industri</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Bootcamp & Training Camp</h4>
                        <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                          <li>Bootcamp tematik (Basic Geology, Basic Geophysics, Seismology, GIS, dll.)</li>
                          <li>Training Camp berkolaborasi untuk skill praktis & sertifikasi</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Webinar & Workshop</h4>
                        <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                          <li>Sharing Session dan berbagi insight</li>
                          <li>Workshop teknis (software, field method, data interpretation)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Publikasi & Media</h4>
                        <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                          <li>Buletin bulanan Geo-Zine dan majalah Jendela Geosaintis</li>
                          <li>Riset dan publikasi melalui Geo-Book / Jurnal Geosaintis Muda</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="geosc">
                  <AccordionTrigger>Apa itu GEOSC dan siapa saja yang bisa ikut?</AccordionTrigger>
                  <AccordionContent>
                    GEOSC adalah event tahunan FGMI berupa konferensi & kompetisi. Pesertanya mahasiswa, fresh graduate,
                    dan geosaintis muda dari seluruh Indonesia.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="program-eligibility">
                  <AccordionTrigger>Apakah program FGMI hanya untuk mahasiswa geosains?</AccordionTrigger>
                  <AccordionContent>
                    Tidak. Fresh graduate, early-career geoscientist, bahkan profesional muda tetap bisa ikut program
                    tertentu.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="online-offline">
                  <AccordionTrigger>Apakah kegiatan FGMI selalu online atau ada yang offline?</AccordionTrigger>
                  <AccordionContent>
                    Kegiatan FGMI kombinasi online (webinar, e-learning, podcast) dan offline (conference, training
                    camp, networking).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Collaboration Section */}
          <Card id="collaboration" className="scroll-mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Handshake className="h-6 w-6 text-primary" />
                Kolaborasi & Partner
              </CardTitle>
              <CardDescription>Informasi tentang kemitraan dan kolaborasi FGMI</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="collaborations">
                  <AccordionTrigger>FGMI berkolaborasi dengan siapa saja?</AccordionTrigger>
                  <AccordionContent>
                    FGMI aktif bekerja sama dengan organisasi profesi (IAGI, HAGI, IATMI, PERHAPI, IAFMI), universitas,
                    alumni, dan lembaga internasional.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="professional-orgs">
                  <AccordionTrigger>Apakah FGMI bekerja sama dengan organisasi profesi?</AccordionTrigger>
                  <AccordionContent>
                    Ya, FGMI adalah bagian dari IAGI dan memiliki hubungan erat dengan organisasi profesi lain di bidang
                    kebumian.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="corporate-partnership">
                  <AccordionTrigger>Bisa nggak perusahaan jadi sponsor atau partner?</AccordionTrigger>
                  <AccordionContent>
                    Bisa. FGMI membuka peluang sponsorship, partnership, maupun CSR untuk mendukung program pengembangan
                    geosaintis muda.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Administration Section */}
          <Card id="administration" className="scroll-mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FaCogs className="h-6 w-6 text-primary" />
                Hal Teknis & Administrasi
              </CardTitle>
              <CardDescription>Informasi tentang kebutuhan teknis dan administrasi anggota</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="email-organization">
                  <AccordionTrigger>Apakah FGMI menyediakan email organisasi untuk anggotanya?</AccordionTrigger>
                  <AccordionContent>
                    Ya, Pengurus FGMI dan Anak Organisasi (SM-IAGI) dapat memperoleh email resmi FGMI.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="docs-certification">
                  <AccordionTrigger>Bagaimana cara mengurus dokumen/sertifikat kegiatan FGMI?</AccordionTrigger>
                  <AccordionContent>
                    <span>Sertifikat kegiatan dapat diunduh melalui link resmi yang dibagikan setelah acara selesai. Jika ada kendala, dapat menghubungi Tim Operasional FGMI melalui <Link className="text-primary font-semibold" href="mailto:operation@fgmi.or.id">operation@fgmi.or.id.</Link></span>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="troubleshooting-register">
                  <AccordionTrigger>Bagaimana jika saya punya kendala saat daftar Membership atau Bootcamp?</AccordionTrigger>
                  <AccordionContent>
                    Bisa langsung menghubungi tim FGMI via WhatsApp, email, atau DM Instagram untuk bantuan teknis.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Others Section */}
          <Card id="others" className="scroll-mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FaQuestion className="h-6 w-6 text-primary" />
                Pertanyaan lainnya
              </CardTitle>
              <CardDescription>Pertanyaan lainnya tentang kebutuhan anggota</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="how-to-contribution">
                  <AccordionTrigger>Bagaimana cara kontribusi di FGMI?</AccordionTrigger>
                  <AccordionContent>
                    Anda bisa aktif melalui program keanggotaan, menjadi volunteer, atau terlibat di SM-IAGI.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="docs-certification">
                  <AccordionTrigger>Apa yang bisa saya lakukan jika ingin menjadi volunteer atau panitia?</AccordionTrigger>
                  <AccordionContent>
                    Pantau pengumuman open recruitment di instagram atau media informasi FGMI lainnya.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="chance-to-work">
                  <AccordionTrigger>Apakah ada kesempatan magang/kerja sama dengan industri?</AccordionTrigger>
                  <AccordionContent>
                    Ya, FGMI berupaya menjembatani mahasiswa dan geosaintis muda dengan industri melalui training, bootcamp, dan program kolaborasi.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact & Access Section */}
          <Card id="contact" className="scroll-mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Mail className="h-6 w-6 text-primary" />
                Akses & Media
              </CardTitle>
              <CardDescription>Cara menghubungi dan mengikuti informasi terbaru FGMI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="follow-info">
                    <AccordionTrigger>Di mana saya bisa mengikuti informasi terbaru FGMI?</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Globe className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Website</p>
                            <Link href="https://fgmi.iagi.or.id" target="_blank" className="text-sm text-muted-foreground">fgmi.iagi.or.id</Link>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Instagram className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Instagram</p>
                            <Link href="https://www.instagram.com/fgmindo/" target="_blank" className="text-sm text-muted-foreground">@fgmindo</Link>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Linkedin className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">LinkedIn</p>
                            <Link href="https://www.linkedin.com/company/fgmindo/" target="_blank" className="text-sm text-muted-foreground">Geosaintis Muda (FGMI)</Link>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Youtube className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">YouTube</p>
                            <Link href="https://www.youtube.com/@fgmindo" target="_blank" className="text-sm text-muted-foreground">@fgmindo</Link>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="publications">
                    <AccordionTrigger>Apakah FGMI punya buletin atau majalah?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Geo-Zine</Badge>
                          <span>Buletin bulanan</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Jendela Geosaintis</Badge>
                          <span>Majalah 3 bulanan</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="contact-official">
                    <AccordionTrigger>Bagaimana cara menghubungi FGMI secara resmi?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-primary" />
                          <Link href="mailto:kolaborasi@fgmi.or.id" target="_blank" className="text-sm text-muted-foreground">Email: kolaborasi@fgmi.or.id</Link>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-primary" />
                          <Link href="https://wa.me/628114563860" target="_blank" className="text-sm text-muted-foreground">WhatsApp: +62 821 1456 3860</Link>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Call to Action */}
                <FooterPolicy
                  title="Siap Bergabung dengan FGMI?" 
                  description="Jadilah bagian dari komunitas geosaintis muda Indonesia dan kembangkan karir Anda di bidang kebumian."
                  actions={
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="/register/member" target="_blank">
                        <Button className="bg-primary hover:bg-primary/90">Daftar Sekarang</Button>
                      </Link>
                      {/* <Button variant="outline">Pelajari Lebih Lanjut</Button> */}
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
