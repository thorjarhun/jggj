function pad(template, value) {
    if (template.text) {
        return value + Array(+template.size + 1 - value.length).join(' ');
    }
    return Array(+template.size + 1 - value.length).join('0') + value;
}

var templates = {
    GAS: {
        "returns input?": false,
        input: [
            {
                name: 'tran',
                text: true,
                size: 8
            },
            {
                name: 'message-ind',
                text: true,
                size: 1
            },
            {
                name: 'tracking-number',
                text: true,
                size: 7
            },
            {
                name: 'nca-part-number',
                text: true,
                size: 14
            },
            {
                name: 'nca-serial-number',
                text: false,
                size: 5
            }
        ],
        output: [
            {
                name: 'history-nha',
                size: 1,
                children: [
                    {
                        name: 'next-highest-assembly-id',
                        size: 14
                    },
                    {
                        name: 'nha-serial-number',
                        size: 5
                    },
                    {
                        name: 'off-on-assembly-date',
                        size: 7
                    },
                    {
                        name: 'aircraft-number',
                        size: 5
                    },
                    {
                        name: 'position-code',
                        size: 3
                    },
                    {
                        name: 'off-on-aircraft-date',
                        size: 7
                    }
                ]
            },
            {
                name: 'current-nha',
                size: 1,
                children: [
                    {
                        name: 'next-highest-assembly-id',
                        size: 14
                    },
                    {
                        name: 'nha-serial-number',
                        size: 5
                    },
                    {
                        name: 'off-on-assembly-date',
                        size: 7
                    },
                    {
                        name: 'aircraft-number',
                        size: 5
                    },
                    {
                        name: 'position-code',
                        size: 3
                    },
                    {
                        name: 'off-on-aircraft-date',
                        size: 7
                    }
                ]
            },
            {
                name: 'assembly-detail-count',
                size: 4
            },
            {
                name: 'assembly-detail',
                size: 100,
                children: [
                    {   name: 'assembly-group', size: 1,
                        children: [
                            { name: 'assembly-ind', size: 1 },
                            { name: 'nca-part-number', size: 14 },
                            { name: 'fill-space1', size: 6 },
                            { name: 'nca-serial-number', size: 5 },
                            { name: 'keyword-description', size: 1,
                              children: [
                                    { name: 'keyword', size: 15 },
                                    { name: 'description', size:35 }
                                ]
                            },
                            { name: 'position-code', size: 3 }
                        ]
                    },
                    {   name: 'mfg-group', size: 1,
                        children: [
                            { name: 'mfg-part-number', size: 20 },
                            { name: 'fill-space1', size: 6 },
                            { name: 'mfg-serial-number', size: 15 },
                            { name: 'fill-space2', size: 2 }
                        ]
                    },
                    {   name: 'time-group', size: 6,
                        children: [
                            { name: 'request-status', size: 4 },
                            { name: 'life-limit-ind', size: 1 },
                            { name: 'time-standard', size: 1 },
                            { name: 'time-remaining', size: 7 },
                            { name: 'time-since-overhaul', size: 6 },
                            { name: 'total-time', size: 6 },
                            { name: 'time-since-installation', size: 6 }
                        ]
                    },
                    {   name: 'ftn-group', size: 1,
                        children: [
                            { name: 'ftn-number', size: 6 },
                            { name: 'ownership-code', size: 5 }
                        ]
                    }
                ]
            }
        ]
    }
};

function buildRequest(obj, template) {
    return template.reduce(function(prev, field) {
        return prev + pad(field, obj[field.name]);
    }, '');
}

function parseJSON(data) {
    if (!data) {
        return data;
    }
    if (typeof data === "string") {
        data = JSON.parse(data);
    }
    console.log('parseJSON start: ' + data);
    var str = '';
    try {
        str = buildRequest(data, templates[data.tran].input);
    } catch (e) {
        console.error(e);
    }
    //str = "in=" + str;
    console.log('parseJSON finish: ' + str);
    return str;
}

function buildResponse(structure, str) {
    var i = 0;
    function helper(structure, str) {
        var obj = {};
        structure.forEach(function(field) {
            if (field.children) {
                if (!field.size || field.size == 1) {
                    obj[field.name] = helper(field.children, str);
                } else {
                    obj[field.name] = [];
                    for (var j=0; j < field.size; j++) {
                        obj[field.name].push(helper(field.children, str));
                    }
                }
            } else {
                obj[field.name] = str.slice(i, i + field.size);
                i += field.size;
            }
        });
        return obj;
    }
    return helper(structure, str);
}

function buildJSON(tran, str) {
    var structure = templates[tran];
    if (structure['returns input?']) {
        structure = structure.input.concat(structure.output);
    } else {
        structure = structure.output;
    }

    return buildResponse(structure, str);
}

module.exports.parseJSON = parseJSON;
module.exports.buildJSON = buildJSON;
