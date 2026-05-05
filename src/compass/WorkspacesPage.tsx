import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import './border-animation.css';

const CARD_BG = '#d1d4e3';

// Fully opaque gradient — no rgba transparency, so the tip and tail always blend
// with CARD_BG rather than showing the page background through the border ring.
// Intermediate stops are pre-blended: e.g. #b7a5e6 ≈ 30% purple over CARD_BG.
const COMET_GRADIENT =
  `conic-gradient(from var(--cb-angle),` +
  `  ${CARD_BG}  0deg,` +
  `  #b7a5e6     8deg,` +
  `  #9970e7     16deg,` +
  `  #7c3aed     22deg,` +
  `  #2563eb     52deg,` +
  `  #e11d48     76deg,` +
  `  #d97895     88deg,` +
  `  #d3b8cc     100deg,` +
  `  ${CARD_BG}  110deg,` +
  `  ${CARD_BG}  360deg` +
  `)`;

export default function WorkspacesPage() {
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
        overflow: 'hidden',
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
          opacity: 0.6,
        }}
      />

      {/* Page body */}
      <Box sx={{ px: 8, py: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>

        {/* ── Header row ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <WorkspacesOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography sx={{ fontSize: 28, fontWeight: 700, color: 'text.primary', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              Workspaces
            </Typography>
          </Box>

          {/* Organisation chip */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            bgcolor: CARD_BG,
            borderRadius: '100px',
            px: 2,
            py: 1,
          }}>
            <BusinessOutlinedIcon sx={{ fontSize: 20, color: '#383f45' }} />
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#383f45', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
              AstraZeneca
            </Typography>
          </Box>
        </Box>

        {/* ── CTA card ──
            Wrapper provides a base CARD_BG fill (visible in the 2px padding gap when the
            border overlay is invisible). The ::before pseudo-element carries the animated
            gradient border and fades independently — card content is never affected. */}
        <Box sx={{
          position: 'relative',
          padding: '2px',
          borderRadius: '18px',
          bgcolor: CARD_BG,
          flexShrink: 0,
          isolation: 'isolate',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            border: '2px solid transparent',
            backgroundImage: `linear-gradient(${CARD_BG}, ${CARD_BG}), ${COMET_GRADIENT}`,
            backgroundOrigin: 'padding-box, border-box',
            backgroundClip: 'padding-box, border-box',
            // Two animations share the same 19s cycle so they stay in sync.
            animation: 'cb-orbit-rotate 19s linear infinite, cb-orbit-opacity 19s linear infinite',
            pointerEvents: 'none',
            zIndex: 0,
          },
        }}>

          {/* Inner card — always fully visible */}
          <Box sx={{
            position: 'relative',
            zIndex: 1,
            bgcolor: CARD_BG,
            borderRadius: '16px',
            py: 5,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            overflow: 'hidden',
          }}>
            {/* Decorative icon — filled, white, vertically centred */}
            <WorkspacesIcon sx={{
              position: 'absolute',
              top: '50%',
              right: 40,
              transform: 'translateY(-50%)',
              fontSize: 140,
              color: 'rgba(255,255,255,0.5)',
              pointerEvents: 'none',
            }} />

            {/* Text block */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, zIndex: 1 }}>
              <Typography sx={{
                fontSize: 24,
                fontWeight: 700,
                color: '#23272e',
                letterSpacing: '-0.02em',
                textAlign: 'center',
                lineHeight: 1.2,
              }}>
                Start tracking your research performance
              </Typography>
              <Typography sx={{
                fontSize: 16,
                fontWeight: 500,
                color: '#454c52',
                textAlign: 'center',
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
              }}>
                Create a workspace to start adding publications for comparison and benchmarking.
              </Typography>
            </Box>

            {/* CTA button */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              disableElevation
              sx={{
                bgcolor: 'primary.main',
                color: '#fff',
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                borderRadius: '8px',
                px: '22px',
                py: '14px',
                lineHeight: 1.5,
                textTransform: 'none',
                zIndex: 1,
                '&:hover': { bgcolor: (t) => t.palette.primary.dark },
              }}
            >
              Start a workspace
            </Button>
          </Box>
        </Box>

      </Box>
    </Box>
  );
}
