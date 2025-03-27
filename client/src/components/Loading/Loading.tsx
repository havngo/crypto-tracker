import { CircularProgress } from "@mui/material";

export function Loading() {
    return <div style={{
        width: '100%', 
        height: '100%', 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#FFFFFF80', 
        position: 'absolute',
        zIndex: 10
        }}>
            <CircularProgress size={'5%'}/>
        </div>
}