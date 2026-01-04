import { useState } from 'react';
import { SlidersHorizontal, RefreshCw, Plus, ChevronDown, FileAudio, PlayCircle, FileText, X, CheckSquare, ArrowDownUp, Check } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ImportYouTubeDialog } from './ImportYouTubeDialog';
import { ImportTranscriptDialog } from './ImportTranscriptDialog';

type SessionSortOption = 'most-recent' | 'oldest' | 'longest' | 'shortest' | 'starred';

const SESSION_SORT_OPTIONS: { value: SessionSortOption; label: string }[] = [
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
}

export function SessionsHeader({ 
  totalSessions, 
  selectionMode, 
  selectedCount = 0,
  onToggleSelectionMode,
  onSelectAll,
  allSelected
}: SessionsHeaderProps) {
  const [youtubeDialogOpen, setYoutubeDialogOpen] = useState(false);
  const [transcriptDialogOpen, setTranscriptDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SessionSortOption>('most-recent');

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
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-foreground">Sessions</h1>
          <span className="rounded-md bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
            {totalSessions}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowDownUp className="h-4 w-4" />
                {currentSortLabel}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {SESSION_SORT_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span>{option.label}</span>
                  {sortBy === option.value && <Check className="h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New
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
    </>
  );
}
