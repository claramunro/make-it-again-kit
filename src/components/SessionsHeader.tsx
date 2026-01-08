import { useState } from 'react';
import { SlidersHorizontal, RefreshCw, Plus, ChevronDown, FileAudio, PlayCircle, FileText, X, CheckSquare, ArrowDownUp, Check, Merge } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ImportYouTubeDialog } from './ImportYouTubeDialog';
import { ImportTranscriptDialog } from './ImportTranscriptDialog';
import { MergeSessionsDialog } from './MergeSessionsDialog';
import { useToast } from '@/hooks/use-toast';

export type SessionSortOption = 'most-recent' | 'oldest' | 'longest' | 'shortest' | 'starred';

export const SESSION_SORT_OPTIONS: { value: SessionSortOption; label: string }[] = [
  { value: 'most-recent', label: 'Most Recent' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'longest', label: 'Longest' },
  { value: 'shortest', label: 'Shortest' },
  { value: 'starred', label: 'Starred' },
];

interface SessionsHeaderProps {
  totalSessions: number;
  selectionMode?: boolean;
  selectedCount?: number;
  onToggleSelectionMode?: () => void;
  onSelectAll?: () => void;
  allSelected?: boolean;
  sortBy: SessionSortOption;
  onSortChange: (sort: SessionSortOption) => void;
}

export function SessionsHeader({ 
  totalSessions, 
  selectionMode, 
  selectedCount = 0,
  onToggleSelectionMode,
  onSelectAll,
  allSelected,
  sortBy,
  onSortChange,
}: SessionsHeaderProps) {
  const [youtubeDialogOpen, setYoutubeDialogOpen] = useState(false);
  const [transcriptDialogOpen, setTranscriptDialogOpen] = useState(false);
  const [mergeDialogOpen, setMergeDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleMergeComplete = () => {
    toast({
      title: "Sessions merged successfully",
      description: "Your sessions have been combined into one.",
      variant: "success",
    });
  };

  const currentSortLabel = SESSION_SORT_OPTIONS.find(opt => opt.value === sortBy)?.label || 'Most Recent';

  if (selectionMode) {
    return (
      <div className="mb-6 flex items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={onSelectAll}
          >
            <CheckSquare className="h-4 w-4" />
            {allSelected ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
        <div className="text-lg font-semibold text-foreground">
          {selectedCount} selected
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleSelectionMode}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-foreground">Sessions</h1>
          <span className="rounded-md bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
            {totalSessions}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setMergeDialogOpen(true)}>
            <Merge className="h-4 w-4" />
            Merge Sessions
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={onToggleSelectionMode}>
            <SlidersHorizontal className="h-4 w-4" />
            Select
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="sm" 
                className="gap-2 bg-orange-100 text-orange-600 border border-orange-400 hover:bg-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500 dark:hover:bg-orange-500/30"
              >
                <Plus className="h-4 w-4" />
                New Session
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuItem className="gap-3 py-3 cursor-pointer">
                <FileAudio className="h-5 w-5" />
                <span>Create Session from Audio File</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-3 py-3 cursor-pointer"
                onClick={() => setYoutubeDialogOpen(true)}
              >
                <PlayCircle className="h-5 w-5" />
                <span>Import from YouTube</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-3 py-3 cursor-pointer"
                onClick={() => setTranscriptDialogOpen(true)}
              >
                <FileText className="h-5 w-5" />
                <span>Create Session from Transcript</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ImportYouTubeDialog 
        open={youtubeDialogOpen} 
        onClose={() => setYoutubeDialogOpen(false)} 
      />
      <ImportTranscriptDialog 
        open={transcriptDialogOpen} 
        onClose={() => setTranscriptDialogOpen(false)} 
      />
      <MergeSessionsDialog 
        open={mergeDialogOpen} 
        onClose={() => setMergeDialogOpen(false)}
        onMergeComplete={handleMergeComplete}
      />
    </>
  );
}
