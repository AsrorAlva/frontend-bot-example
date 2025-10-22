import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Play, CheckCircle, XCircle, Eye, Bot } from 'lucide-react';
import { submissionData } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const ReviewDokumen = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [reviewComment, setReviewComment] = useState('');
  const [botRunning, setBotRunning] = useState(false);
  const { toast } = useToast();

  const pendingSubmissions = submissionData.filter(item => 
    item.status === 'Pending' || item.status === 'Dalam Review'
  );

  const handleBotAutomation = () => {
    setBotRunning(true);
    toast({
      title: "Bot Automation Started",
      description: "Memulai proses otomatis validasi dokumen...",
      duration: 3000,
    });
    
    // Simulate bot processing
    setTimeout(() => {
      setBotRunning(false);
      toast({
        title: "Bot Automation Completed",
        description: "Validasi otomatis selesai. 3 dokumen siap untuk review manual.",
        duration: 5000,
      });
    }, 3000);
  };

  const handleApprove = (submissionId) => {
    toast({
      title: "Dokumen Disetujui",
      description: `Pengajuan ${submissionId} telah disetujui.`,
      duration: 3000,
    });
  };

  const handleReject = (submissionId) => {
    toast({
      title: "Dokumen Ditolak", 
      description: `Pengajuan ${submissionId} telah ditolak.`,
      duration: 3000,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Bot Automation Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Bot className="w-5 h-5 mr-2 text-blue-600" />
            Bot Automation
          </CardTitle>
          <p className="text-sm text-gray-600">
            Jalankan validasi otomatis untuk dokumen baru
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">
                {pendingSubmissions.length} dokumen menunggu validasi
              </p>
              <p className="text-xs text-gray-500">
                Bot akan memvalidasi format, kelengkapan, dan konsistensi data
              </p>
            </div>
            <Button 
              onClick={handleBotAutomation}
              disabled={botRunning}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {botRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Bot Automation
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pending Reviews */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Dokumen Menunggu Review
          </CardTitle>
          <p className="text-sm text-gray-600">
            {pendingSubmissions.length} pengajuan memerlukan review manual
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingSubmissions.map((submission) => (
            <div key={submission.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{submission.namaProduk}</h3>
                  <p className="text-sm text-gray-600">{submission.perusahaan}</p>
                  <p className="text-xs text-gray-500">ID: {submission.id}</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">
                  {submission.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Diajukan: {new Date(submission.tanggalPengajuan).toLocaleDateString('id-ID')}
                </p>
                
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Review Dokumen - {submission.namaProduk}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">ID Pengajuan</label>
                            <p className="text-sm text-gray-900">{submission.id}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Perusahaan</label>
                            <p className="text-sm text-gray-900">{submission.perusahaan}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Nama Produk</label>
                            <p className="text-sm text-gray-900">{submission.namaProduk}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Status</label>
                            <Badge className="bg-orange-100 text-orange-800">
                              {submission.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Komentar Review</label>
                          <Textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="Tambahkan komentar untuk pengajuan ini..."
                            className="min-h-[100px]"
                          />
                        </div>
                        
                        <div className="flex space-x-4">
                          <Button 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(submission.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Setujui
                          </Button>
                          <Button 
                            variant="destructive" 
                            className="flex-1"
                            onClick={() => handleReject(submission.id)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Tolak
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
          
          {pendingSubmissions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Tidak ada dokumen yang menunggu review.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewDokumen;