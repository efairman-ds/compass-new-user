import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import StarIcon from '@mui/icons-material/Star';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { alpha } from '@mui/material/styles';
import type { Workspace } from './workspaceData';

// ── Sparkline ──────────────────────────────────────────────────────────────────

function Sparkline({ data }: { data: number[] }) {
  const W = 93, H = 27;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - ((v - min) / range) * (H - 6) - 3,
  ]);
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const isUp = data[data.length - 1] >= data[0];
  const dotColor = isUp ? '#16a34a' : '#dc2626';
  const [lastX, lastY] = pts[pts.length - 1];

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible', flexShrink: 0 }}>
      <path d={d} fill="none" stroke="#b0b8cc" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r={3} fill={dotColor} />
    </svg>
  );
}

// ── Workspace card ─────────────────────────────────────────────────────────────

interface CardProps {
  workspace: Workspace;
  onMenuOpen: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

function WorkspaceCard({ workspace, onMenuOpen }: CardProps) {
  return (
    <Box sx={{
      bgcolor: '#fff',
      border: '1px solid #bec2d6',
      borderRadius: '12px',
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      minWidth: 0,
    }}>
      {/* Title row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WorkspacesIcon sx={{ fontSize: 24, color: 'primary.main', flexShrink: 0 }} />
        <Typography sx={{
          flex: 1,
          fontSize: 18,
          fontWeight: 600,
          color: 'text.primary',
          letterSpacing: '-0.01em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          minWidth: 0,
        }}>
          {workspace.name}
        </Typography>
        <IconButton
          size="small"
          onClick={(e) => onMenuOpen(e, workspace.id)}
          sx={{ flexShrink: 0, color: 'text.disabled', '&:hover': { color: 'text.primary', bgcolor: (t) => alpha(t.palette.primary.main, 0.06) } }}
        >
          <MoreHorizIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Meta row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <ArticleOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled', flexShrink: 0 }} />
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'text.secondary', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
            {workspace.publications.toLocaleString()} publications
          </Typography>
        </Box>
        {workspace.createdBy && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <PersonAddOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled', flexShrink: 0 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'text.secondary', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
              Created by {workspace.createdBy}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Score snapshot */}
      <Box sx={{
        bgcolor: '#f6f7fb',
        borderRadius: '4px',
        px: 3,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{
            fontSize: 10,
            fontWeight: 600,
            color: 'text.secondary',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            lineHeight: 1,
            mb: 0.75,
          }}>
            Performance Score
          </Typography>
          <Typography sx={{
            fontSize: 24,
            fontWeight: 300,
            color: 'text.primary',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}>
            {workspace.score.toLocaleString()}
          </Typography>
        </Box>
        <Sparkline data={workspace.sparkData} />
      </Box>
    </Box>
  );
}

// ── Section header ─────────────────────────────────────────────────────────────

function SectionHeader({ icon, title, count, tooltip }: {
  icon: React.ReactNode;
  title: string;
  count: number;
  tooltip: string;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Typography sx={{ fontSize: 20, fontWeight: 600, color: 'text.primary', letterSpacing: '-0.01em' }}>
        {title}{' '}
        <Box component="span" sx={{ fontWeight: 400 }}>({count})</Box>
      </Typography>
      <Tooltip title={tooltip} placement="right" arrow>
        <InfoOutlinedIcon sx={{ fontSize: 20, color: 'text.disabled', cursor: 'help', ml: 0.25 }} />
      </Tooltip>
    </Box>
  );
}

// ── Card grid ──────────────────────────────────────────────────────────────────

function CardGrid({ workspaces, onMenuOpen }: { workspaces: Workspace[]; onMenuOpen: CardProps['onMenuOpen'] }) {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
      gap: 2,
    }}>
      {workspaces.map(w => (
        <WorkspaceCard key={w.id} workspace={w} onMenuOpen={onMenuOpen} />
      ))}
    </Box>
  );
}

// ── Props / page ───────────────────────────────────────────────────────────────

interface Props {
  yourWorkspaces: Workspace[];
  sharedWorkspaces: Workspace[];
  favouriteIds: string[];
  onToggleFavourite: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}

export default function WorkspacesPage({
  yourWorkspaces,
  sharedWorkspaces,
  favouriteIds,
  onToggleFavourite,
  onRename,
  onDelete,
}: Props) {
  const [search, setSearch] = useState('');
  const [showAllShared, setShowAllShared] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [menuCardId, setMenuCardId] = useState<string | null>(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState('');

  const allWorkspaces = [...yourWorkspaces, ...sharedWorkspaces];

  const filter = (ws: Workspace[]) =>
    search.trim() ? ws.filter(w => w.name.toLowerCase().includes(search.toLowerCase())) : ws;

  const filteredYour     = filter(yourWorkspaces);
  const filteredShared   = filter(sharedWorkspaces);
  const favourited       = favouriteIds.map(id => allWorkspaces.find(w => w.id === id)).filter((w): w is Workspace => !!w);
  const filteredFav      = filter(favourited);
  const shownShared      = showAllShared ? filteredShared : filteredShared.slice(0, 6);
  const hiddenCount      = filteredShared.length - 6;

  const menuIsFav        = menuCardId ? favouriteIds.includes(menuCardId) : false;
  const noResults        = filteredFav.length === 0 && filteredYour.length === 0 && filteredShared.length === 0 && search.trim() !== '';

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setMenuAnchor(e.currentTarget);
    setMenuCardId(id);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setMenuCardId(null);
  };

  const handleRenameClick = () => {
    const ws = allWorkspaces.find(w => w.id === menuCardId);
    if (ws) setRenameValue(ws.name);
    // Keep menuCardId set — needed for submit. Close the popover only.
    setMenuAnchor(null);
    setRenameOpen(true);
  };

  const handleRenameSubmit = () => {
    if (menuCardId && renameValue.trim()) onRename(menuCardId, renameValue.trim());
    setRenameOpen(false);
    setMenuCardId(null);
  };

  const handleDeleteClick = () => {
    if (menuCardId) onDelete(menuCardId);
    closeMenu();
  };

  const handleFavouriteClick = () => {
    if (menuCardId) onToggleFavourite(menuCardId);
    closeMenu();
  };

  return (
    <Box
      component="main"
      sx={{
        ml: '72px',
        flex: 1,
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowY: 'auto',
      }}
    >
      {/* Watermark */}
      <Box
        component="img"
        src="/watermark.svg"
        aria-hidden
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: 330,
          height: 370,
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <Box sx={{ px: 8, py: 4, display: 'flex', flexDirection: 'column', gap: 4, position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <WorkspacesIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography sx={{ fontSize: 28, fontWeight: 700, color: 'text.primary', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              Workspaces
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <OutlinedInput
              size="small"
              placeholder="Search for a workspace"
              value={search}
              onChange={e => setSearch(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlinedIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </InputAdornment>
              }
              sx={{
                width: 235,
                bgcolor: '#fafafa',
                fontSize: 15,
                letterSpacing: '-0.01em',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ced2d6' },
                '& .MuiOutlinedInput-input': { py: '10px' },
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              disableElevation
              sx={{
                bgcolor: 'primary.main',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                borderRadius: '8px',
                px: '18px',
                py: '10px',
                textTransform: 'none',
                whiteSpace: 'nowrap',
                '&:hover': { bgcolor: (t) => t.palette.primary.dark },
              }}
            >
              Start a new workspace
            </Button>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              bgcolor: '#d1d4e3',
              borderRadius: '100px',
              px: 2,
              py: 1,
              whiteSpace: 'nowrap',
            }}>
              <BusinessOutlinedIcon sx={{ fontSize: 20, color: '#383f45' }} />
              <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#383f45', letterSpacing: '-0.01em' }}>
                AstraZeneca
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ── Favourites ── */}
        {filteredFav.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <SectionHeader
              icon={<StarIcon sx={{ fontSize: 24, color: '#f59e0b' }} />}
              title="Favourites"
              count={filteredFav.length}
              tooltip="Workspaces you have marked as favourites."
            />
            <CardGrid workspaces={filteredFav} onMenuOpen={handleMenuOpen} />
          </Box>
        )}

        {/* ── Your workspaces ── */}
        {filteredYour.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <SectionHeader
              icon={<PersonOutlinedIcon sx={{ fontSize: 24, color: 'text.primary' }} />}
              title="Your workspaces"
              count={filteredYour.length}
              tooltip="Workspaces you've created. Workspace score reflects how complete and active a workspace is, based on factors like content coverage, recency of updates, and usage."
            />
            <CardGrid workspaces={filteredYour} onMenuOpen={handleMenuOpen} />
          </Box>
        )}

        {/* ── Shared with you ── */}
        {filteredShared.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <SectionHeader
              icon={<ShareOutlinedIcon sx={{ fontSize: 24, color: 'text.primary' }} />}
              title="Shared with you"
              count={filteredShared.length}
              tooltip="Workspaces created by others in your organisation. Workspace score reflects how complete and active a workspace is, based on factors like content coverage, recency of updates, and usage."
            />
            <CardGrid workspaces={shownShared} onMenuOpen={handleMenuOpen} />
            {filteredShared.length > 6 && (
              <Button
                fullWidth
                disableElevation
                onClick={() => setShowAllShared(p => !p)}
                sx={{
                  bgcolor: '#d1d4e3',
                  color: 'rgba(0,0,0,0.6)',
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  borderRadius: '8px',
                  px: '22px',
                  py: '14px',
                  textTransform: 'none',
                  '&:hover': { bgcolor: alpha('#d1d4e3', 0.75) },
                }}
              >
                {showAllShared ? 'Show fewer' : `View more (${hiddenCount})`}
              </Button>
            )}
          </Box>
        )}

        {/* ── No results ── */}
        {noResults && (
          <Typography sx={{ color: 'text.disabled', textAlign: 'center', py: 8, fontSize: 16 }}>
            No workspaces match "{search}"
          </Typography>
        )}
      </Box>

      {/* ── Ellipsis menu ── */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              minWidth: 190,
            },
          },
        }}
      >
        <MenuItem onClick={handleRenameClick} sx={{ fontSize: 14, letterSpacing: '-0.01em', py: 1.25 }}>
          Rename workspace
        </MenuItem>
        <MenuItem onClick={handleFavouriteClick} sx={{ fontSize: 14, letterSpacing: '-0.01em', py: 1.25 }}>
          {menuIsFav ? 'Remove from favourites' : 'Add to favourites'}
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ fontSize: 14, letterSpacing: '-0.01em', py: 1.25, color: '#dc2626' }}>
          Delete workspace
        </MenuItem>
      </Menu>

      {/* ── Rename dialog ── */}
      <Dialog
        open={renameOpen}
        onClose={() => { setRenameOpen(false); setMenuCardId(null); }}
        maxWidth="xs"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: '12px' } } }}
      >
        <DialogTitle sx={{ fontSize: 18, fontWeight: 600, pb: 1 }}>Rename workspace</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            size="small"
            value={renameValue}
            onChange={e => setRenameValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRenameSubmit()}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={() => { setRenameOpen(false); setMenuCardId(null); }}
            sx={{ textTransform: 'none', color: 'text.secondary', borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={handleRenameSubmit}
            sx={{ textTransform: 'none', borderRadius: '8px' }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
