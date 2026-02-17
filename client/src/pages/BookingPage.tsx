import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone } from "lucide-react";
import { toast } from "sonner";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    serviceId: "",
    packageId: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch services and packages
  const { data: services } = trpc.services.list.useQuery();
  const { data: packages } = trpc.packages.list.useQuery();
  const createAppointmentMutation = trpc.appointments.create.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Combine date and time
      const appointmentDateTime = new Date(`${formData.appointmentDate}T${formData.appointmentTime}`);

      await createAppointmentMutation.mutateAsync({
        clientName: formData.clientName,
        clientEmail: formData.clientEmail || undefined,
        clientPhone: formData.clientPhone,
        serviceId: formData.serviceId ? parseInt(formData.serviceId) : undefined,
        packageId: formData.packageId ? parseInt(formData.packageId) : undefined,
        appointmentDate: appointmentDateTime,
        notes: formData.notes || undefined,
      });

      toast.success("تم حجز الموعد بنجاح! سيتم التواصل معك قريباً");
      setFormData({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        serviceId: "",
        packageId: "",
        appointmentDate: "",
        appointmentTime: "",
        notes: "",
      });
    } catch (error) {
      toast.error("حدث خطأ في حجز الموعد. يرجى المحاولة مرة أخرى");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-black mb-4">
            احجز موعدك <span className="text-pink-500">الآن</span>
          </h1>
          <p className="text-gray-400 text-lg">اختر الخدمة أو الباقة المناسبة لك وحدد موعد مناسب</p>
        </motion.div>

        {/* Booking Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <Card className="bg-white/5 border-white/10 p-8">
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-pink-500" />
                بيانات شخصية
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="clientName" className="text-white mb-2 block">
                    الاسم الكامل *
                  </Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="أدخل اسمك الكامل"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label htmlFor="clientEmail" className="text-white mb-2 block">
                    البريد الإلكتروني
                  </Label>
                  <Input
                    id="clientEmail"
                    name="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label htmlFor="clientPhone" className="text-white mb-2 block flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    رقم الهاتف *
                  </Label>
                  <Input
                    id="clientPhone"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    placeholder="+20 1xx xxx xxxx"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-6">اختر الخدمة أو الباقة</h2>

              <div className="space-y-4">
                {services && services.length > 0 && (
                  <div>
                    <Label htmlFor="serviceId" className="text-white mb-2 block">
                      الخدمات
                    </Label>
                    <Select value={formData.serviceId} onValueChange={(value) => handleSelectChange("serviceId", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="اختر خدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.nameAr} - {service.price} LE
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {packages && packages.length > 0 && (
                  <div>
                    <Label htmlFor="packageId" className="text-white mb-2 block">
                      الباقات
                    </Label>
                    <Select value={formData.packageId} onValueChange={(value) => handleSelectChange("packageId", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="اختر باقة" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id.toString()}>
                            {pkg.nameAr} - {pkg.price} LE
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            {/* Appointment Date & Time */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-pink-500" />
                اختر الموعد والوقت
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="appointmentDate" className="text-white mb-2 block">
                    التاريخ *
                  </Label>
                  <Input
                    id="appointmentDate"
                    name="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="appointmentTime" className="text-white mb-2 block flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    الوقت *
                  </Label>
                  <Input
                    id="appointmentTime"
                    name="appointmentTime"
                    type="time"
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <Label htmlFor="notes" className="text-white mb-2 block">
                ملاحظات إضافية
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="أي ملاحظات أو متطلبات خاصة؟"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 min-h-24"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? "جاري الحجز..." : "تأكيد الحجز"}
            </Button>
          </Card>
        </motion.form>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white/5 border border-white/10 rounded-lg p-6"
        >
          <p className="text-gray-300 text-center">
            سيتم التواصل معك قريباً لتأكيد الموعد. تأكد من صحة رقم هاتفك
          </p>
        </motion.div>
      </div>
    </div>
  );
}
