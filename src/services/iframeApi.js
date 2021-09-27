const origin = 'localhost:3000';

const checkIframePermission = (apiurl) => {
    return fetch("https://header-inspector.repalash.workers.dev/?" + new URLSearchParams({
        'apiurl': apiurl,
        'headers': 'x-frame-options'
    }), {
        method: 'GET'
    }).then(r => r.json()).then(json => {
        let xFrameOp = (json.headers['x-frame-options'] || '').toLowerCase();
        // deny all requests
        if (xFrameOp === 'deny') return false;
        // deny if different origin
        if (xFrameOp === 'sameorigin' && json.origin !== origin) return false;
        return true;
    })
}

export {
    checkIframePermission
}