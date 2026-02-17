import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Upload, Package, Calendar, Image, Settings } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<"files" | "services" | "packages" | "appointments">("files");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Fetch data
  const { data: userFiles } = trpc.files.getUserFiles.useQuery(undefined, {
    enabled: !!user,
  });
  const { data: services } = trpc.services.list.useQuery();
  const { data: packages } = trpc.packages.list.useQuery();
  const { data: appointments } = trpc.appointments.list.useQuery(undefined, {
    enabled: user?.role === "admin",
  });

  const fileUploadMutation = trpc.files.recordUpload.useMutation();
  const deleteFileMutation = trpc.files.deleteFile.useMutation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white">جاري التحميل...</div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">غير مصرح لك بالوصول إلى لوحة التحكم</p>
          <p className="text-gray-400">يرجى تسجيل الدخول كمسؤول</p>
        </div>
      </div>
    );
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(files);

    for (const file of files) {
      try {
        // In production, you would upload to S3 first
        // For now, we'll just record the file in the database
        await fileUploadMutation.mutateAsync({
          fileName: file.name,
          fileKey: `uploads/${user.id}/${Date.now()}-${file.name}`,
          fileUrl: URL.createObjectURL(file),
          mimeType: file.type,
          fileSize: file.size,
          category: "gallery",
          description: "تم التحميل من لوحة التحكم",
        });
      } catch (error) {
        console.error("Failed to upload file:", error);
      }
    }
  };

  const handleDeleteFile = async (fileId: number) => {
    try {
      await deleteFileMutation.mutateAsync({ fileId });
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-black">
            لوحة التحكم <span className="text-pink-500">الإدارية</span>
          </h1>
          <p className="text-gray-400 mt-2">مرحباً {user.name}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-4 mb-8 flex-wrap">
          {[
            { id: "files", label: "الملفات", icon: Image },
            { id: "services", label: "الخدمات", icon: Settings },
            { id: "packages", label: "الباقات", icon: Package },
            { id: "appointments", label: "الحجوزات", icon: Calendar },
          ].map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === id
                  ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
              {label}
            </motion.button>
          ))}
        </div>

        {/* Files Tab */}
        {activeTab === "files" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card className="bg-white/5 border-white/10 p-8">
              <div className="flex items-center gap-4 mb-6">
                <Upload className="w-6 h-6 text-pink-500" />
                <h2 className="text-2xl font-bold">إدارة الملفات</h2>
              </div>

              <div className="border-2 border-dashed border-pink-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-pink-500/60 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept="image/*"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-6xl mb-4">📁</div>
                  <p className="text-xl font-bold mb-2">اسحب الملفات هنا أو انقر للتحميل</p>
                  <p className="text-gray-400">يدعم الصور بصيغ JPG, PNG, WebP</p>
                </label>
              </div>

              {userFiles && userFiles.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">الملفات المرفوعة ({userFiles.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userFiles.map((file) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-pink-500/30 transition-all"
                      >
                        <img
                          src={file.fileUrl}
                          alt={file.fileName}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <p className="text-sm font-bold truncate mb-2">{file.fileName}</p>
                        <p className="text-xs text-gray-400 mb-4">{file.category}</p>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="w-full"
                          onClick={() => handleDeleteFile(file.id)}
                        >
                          حذف
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card className="bg-white/5 border-white/10 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Settings className="w-6 h-6 text-pink-500" />
                  <h2 className="text-2xl font-bold">الخدمات</h2>
                </div>
                <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600">
                  إضافة خدمة
                </Button>
              </div>

              {services && services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white/5 border border-white/10 rounded-lg p-6"
                    >
                      <h3 className="text-lg font-bold mb-2">{service.nameAr}</h3>
                      <p className="text-sm text-gray-400 mb-4">{service.descriptionAr}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-pink-500 font-bold">{service.price} LE</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            تعديل
                          </Button>
                          <Button size="sm" variant="destructive">
                            حذف
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">لا توجد خدمات</p>
              )}
            </Card>
          </motion.div>
        )}

        {/* Packages Tab */}
        {activeTab === "packages" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card className="bg-white/5 border-white/10 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Package className="w-6 h-6 text-pink-500" />
                  <h2 className="text-2xl font-bold">الباقات</h2>
                </div>
                <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600">
                  إضافة باقة
                </Button>
              </div>

              {packages && packages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white/5 border border-white/10 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">{pkg.nameAr}</h3>
                        {pkg.isPopular && (
                          <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                            الأكثر طلباً
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-4">{pkg.descriptionAr}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-pink-500 font-bold text-lg">{pkg.price} LE</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            تعديل
                          </Button>
                          <Button size="sm" variant="destructive">
                            حذف
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">لا توجد باقات</p>
              )}
            </Card>
          </motion.div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card className="bg-white/5 border-white/10 p-8">
              <div className="flex items-center gap-4 mb-6">
                <Calendar className="w-6 h-6 text-pink-500" />
                <h2 className="text-2xl font-bold">الحجوزات والمواعيد</h2>
              </div>

              {appointments && appointments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-right py-4 px-4 font-bold">الاسم</th>
                        <th className="text-right py-4 px-4 font-bold">الهاتف</th>
                        <th className="text-right py-4 px-4 font-bold">التاريخ</th>
                        <th className="text-right py-4 px-4 font-bold">الحالة</th>
                        <th className="text-right py-4 px-4 font-bold">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((apt) => (
                        <tr key={apt.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4">{apt.clientName}</td>
                          <td className="py-4 px-4">{apt.clientPhone}</td>
                          <td className="py-4 px-4">{new Date(apt.appointmentDate).toLocaleDateString("ar-EG")}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-bold ${
                                apt.status === "confirmed"
                                  ? "bg-green-500/20 text-green-400"
                                  : apt.status === "completed"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : apt.status === "cancelled"
                                      ? "bg-red-500/20 text-red-400"
                                      : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {apt.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <Button size="sm" variant="outline">
                              تعديل
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">لا توجد حجوزات</p>
              )}
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
