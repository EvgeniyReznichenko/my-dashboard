import { Box, Button, duration, Typography, useTheme } from '@mui/material'
import { tokens } from '../theme'
import { useEffect, useState } from 'react'

const WatchStatus = {
    Running: 'Running',
    Stopped: 'Stopped',
    Ready: 'Ready',
}

function Watch() {
    let start = 0
    let tempDuration = 0
    let status = WatchStatus.Ready

    Object.defineProperty(this, 'duration', {
        get: function () {
            let duration = 0
            if (start && status === WatchStatus.Running)
                duration = Date.now() - start + tempDuration
            if (start && status === WatchStatus.Stopped) duration = tempDuration
            return duration
        },
    })

    Object.defineProperty(this, 'status', {
        get: function () {
            return status
        },
    })

    this.start = function () {
        if (status === WatchStatus.Running) {
            console.log('Cannot start')
            return
        }
        status = WatchStatus.Running
        start = Date.now()
    }

    this.stop = function () {
        if (status !== WatchStatus.Running) {
            console.log('Cannot stop')
            return
        }
        tempDuration = this.duration
        status = WatchStatus.Stopped
    }

    this.reset = function () {
        if (status === WatchStatus.Running) {
            console.log('Cannot reset')
            return
        }
        start = null
        status = WatchStatus.Ready
        tempDuration = 0
    }
}

const Timer = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [watch, setWatch] = useState(new Watch())
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(watch.duration)
        }, 100)
        return () => clearInterval(interval)
    }, [])

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: '14px',
                            fontWeight: 'bold',
                            padding: '10px 20px',
                        }}
                        onClick={watch.start.bind(watch)}
                    >
                        {watch.status === WatchStatus.Ready
                            ? 'Start'
                            : 'Resume'}
                    </Button>
                </Box>
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: '14px',
                            fontWeight: 'bold',
                            padding: '10px 20px',
                        }}
                        onClick={watch.stop.bind(watch)}
                    >
                        Stop
                    </Button>
                </Box>
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: '14px',
                            fontWeight: 'bold',
                            padding: '10px 20px',
                        }}
                        onClick={watch.reset.bind(watch)}
                    >
                        Reset
                    </Button>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography
                    variant="h5"
                    sx={{ color: colors.greenAccent[500] }}
                >
                    My timer {watch.status}
                </Typography>
                <Typography
                    variant="h5"
                    fontStyle="italic"
                    sx={{ color: colors.greenAccent[600] }}
                >
                    {'Time ' + seconds}
                </Typography>
            </Box>
        </Box>
    )
}

export default Timer
