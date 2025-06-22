import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Link, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File | string) => void;
  isUploading?: boolean;
}

export function VideoUploadModal({ isOpen, onClose, onUpload, isUploading = false }: VideoUploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        setVideoLink("");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setVideoLink("");
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    } else if (videoLink.trim()) {
      onUpload(videoLink.trim());
    }
  };

  const canSubmit = selectedFile || videoLink.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-orange-500" />
            <span>Upload Video for Analysis</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Drag and Drop Zone */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              dragActive 
                ? "border-orange-400 bg-orange-50" 
                : "border-gray-300 hover:border-orange-300 hover:bg-orange-50/50",
              selectedFile && "border-green-400 bg-green-50"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">
              {selectedFile ? selectedFile.name : "Drop your video here"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports .mp4, .mov, .webm files
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              Choose File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Choose video file"
              title="Choose video file"
            />
          </div>

          {/* Or Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          {/* Link Input */}
          <div className="space-y-2">
            <Label htmlFor="video-link" className="flex items-center space-x-2">
              <Link className="w-4 h-4 text-orange-500" />
              <span>Paste a video link</span>
            </Label>
            <Input
              id="video-link"
              placeholder="https://youtube.com/watch?v=... or https://instagram.com/p/..."
              value={videoLink}
              onChange={(e) => {
                setVideoLink(e.target.value);
                setSelectedFile(null);
              }}
              className="border-orange-200 focus:border-orange-400"
            />
            <p className="text-xs text-gray-500">
              Supports YouTube and Instagram links
            </p>
          </div>

          {/* Description */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-800">
              We'll extract your content and analyze what's working — hooks, timing, engagement flow.
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || isUploading}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Starting Analysis...
                </>
              ) : (
                "Start Analysis"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 