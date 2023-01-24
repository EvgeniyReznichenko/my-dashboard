import {Box, Button, Typography, useTheme} from "@mui/material";
import { tokens } from "../theme";
import WatchLaterOutlined from "@mui/icons-material/WatchLaterOutlined";

const WatchStatus = {
    running: 'running',
    stopped: 'stopped'
}
function Watch(){
    let start;
    let stop;
    let status;

    Object.defineProperty(this, 'duration', {
        get: function(){
            if(start && status)
                return start - new Date();
        }
    });

    this.start = function(){
        if(status === WatchStatus.running){

        }
        start = new Date();
        status = WatchStatus.running;
    };

    this.stop = function(){
        stop = new Date();
        status = WatchStatus.stopped;
    };

    this.resume = function(){
        this.start();
        stop = null;
    };

    this.reset = function(){
        start = null;
        stop = null;
        status = null;
    };
}

const StopWatch = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const watch = new Watch();

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    <WatchLaterOutlined/>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100] }}
                    >
                        Timer
                    </Typography>
                </Box>
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        Start
                    </Button>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                    My timer
                </Typography>
                <Typography
                    variant="h5"
                    fontStyle="italic"
                    sx={{ color: colors.greenAccent[600] }}
                >
                    data
                </Typography>
            </Box>
        </Box>
    );
};

export default StopWatch;