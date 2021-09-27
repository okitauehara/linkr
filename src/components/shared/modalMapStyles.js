let containerMapStyles = {};
let mapStyle = {};
let headerMapStyles = {};
if (window.matchMedia("(max-width: 800px)").matches) {
    containerMapStyles = {
        content: {
            boxSizing: "border-box",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            background: '#333333',
            width: '100vw',
            minHeight: '356px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    };
    mapStyle= {
        height: '240px', 
        width: '90vw',
    }
    headerMapStyles = {

        fontSize: '16px',
        padding: '0 40px',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        minHeight: '81px',
        zIndex: '1', 
        backgroundColor: '#333333'
    }
} else {
    containerMapStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            background: '#333333',
            borderRadius: '20px',
            width: '790px',
            minHeight: '356px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    };
    mapStyle= {
        height: '240px', 
        width: '713px',
    }
    headerMapStyles = {
        fontSize: '38px',
        padding: '0 40px',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        minHeight: '81px',
        zIndex: '1', 
        backgroundColor: '#333333'
    }
}  
  

export { 
    containerMapStyles,
    mapStyle,
    headerMapStyles 
}