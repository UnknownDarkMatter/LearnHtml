
var gl = null;
var g_width = 0;
var g_height = 0;
var g_bumpTexture = null;
var g_envTexture = null;
var g_programObject = null;
var g_vbo = null;
var g_elementVbo = null;
var g_normalsOffset = 0;
var g_tangentsOffset = 0;
var g_binormalsOffset = 0;
var g_texCoordsOffset = 0;
var g_numElements = 0;

// Uniform variables
var g_worldLoc = 0;
var g_worldInverseTransposeLoc = 0;
var g_worldViewProjLoc = 0;
var g_viewInverseLoc = 0;
var g_normalSamplerLoc = 0;
var g_envSamplerLoc = 0;

var g_pendingTextureLoads = 0;

var baseUrl = 'file:///D:\\\\_DATA\\Informatique\\_DEV\\UnknownDarkMatter\\LearnHtml\\3D-CreateObject\\tea-pot\\';
baseUrl = '';
var imageBump = 'data:image/jpeg;base64,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';
var imageSkyboxNegx = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABAAEADASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAABQYDBAABAgf/xAAyEAABAwIDBgUDAwUAAAAAAAABAAIRAwQhMZEFBhJBUYETFCJhcUNToSMz0UJUkrHw/8QAGgEAAgMBAQAAAAAAAAAAAAAAAgMAAQUGBP/EACARAAICAQUAAwAAAAAAAAAAAAABAgNRERITMUEEFCH/2gAMAwEAAhEDEQA/APTrHealUbF9R8EEx4jDLR8jMIxa3lrXE0bmg+cP3BKUXbIDiPS6mdQdF1R2MXB3BVaXN5Fq2pVw8/DMU5+jgXUHMIqVaRDTj68iqfgi5v31vDa6k3hDHAzMIbY7HqcTXua0swOGBR23tSwhpcQyMGg5JTSj0xibfaLVAcLIx7qSFtrcF1wiMyD7FLGGgIWVKgYJIc48mtEkrHNMj1elcOr02/1DVRFankNvtnaNHKq4/OKI229d0zCrTa74EIcX2TvrM1W4svvs1W41TLsy07UMlHfOgB+pQM+wVynvpaGZY8fASWfKHKqwd1oNsznWZqlP41D9DV1o8O32swB6H9gqlbfmiAPDpvn2SkW2XKszVRuFoPqsQ/WoXoXNaw/db513/t0cuZMoZX3h2lWIh8Ki82giKrNVoVrRuVVmqNRpjgHdY+zyo39/99+qwXm0D9epqr7LLGNBEKdliOLICOmK4h3SydbsjgEG42gfrVdVvx9of3NT/JHKdg0NJIBnFSDZ/Row6oeSWS9iwL5r7Q5XFU91z41/9+p2KYhs8TkNFG+wAYQcIGZwVcssk2RwAvN7Q5Vqmqw3t8BJqv1Rd9gImDj0yULrD1SIyOJJ6dvZFzSyTjjgYqVqYkRw/GB7qxTsyRBgx7fzkilK1cSP0ySOowHxhkrVO1HJpPIucIj3P/aLzbhugKZZiefdStsvYEBGWW0YBjIicCAYwxj8qTy8RMtb1iJP+0LZAD5QHIYnmo3WbQ4enHPLAJjdbF2AJdORaAZUVS3J9JLYmcOfypqWK9a0HVskZ5n8KvVtAS4NacoJM4dgmerbuA4iC1zuTTIwyGf5GiqPtmucWU4c4DEzMT0P8okytD//2Q==';
var imageSkyboxPosx = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABAAEADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAABAUCAwYBBwD/xAA4EAABAwMCAgUJBwUAAAAAAAABAgMRAAQFITESYUFRcYGRBhQVIjJEYpLhEyMkQlKhsUVUcpPw/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAQBAgUGA//EAB4RAAIBBAMBAAAAAAAAAAAAAAABAgMREjEhQVET/9oADAMBAAIRAxEAPwD1DM2IS5C0pEnWUkKT/wBype20hCy0+lTjU6FJ25zW0VlWLxktXFvxafnRPfpSZ3FlTpFu5KD1jatyMnpmXKCbuhXfMIabSq2uA8neD7Q7qCCFpKEtqlStuGnqsPdNth0FtQnqmO6pt4VxQDrq2wCYBT0c6nNLsrg29C7GZJaXlpuSddAedTduVpTxqStQ31imVxjWmEFH2ZWTrxSAaARinnCeMlIHRQnHYPLQC5fpWqENAnroB5DrqioJNaFOKZQdUieqrDb24HtJP8VZTS0Q4SezUWtmkxKR2RT3HYxpzTgGvKs/aZ7FiZumtOf0rQ47yjw7ZJ89Z057/tSdWokuGO0oc8oa+gbYiSBSPM4BDclAgDaKfJ8o8Of6hbf7KCynlDiHGuEX1vJB2cFKU60stjEoJrRhH2LuzcUW4WDp6+tAOXt42SohqSI1nSnmRyuLWQReMaz+fakF5fY5UcNyyZ+LatSDg9mfKLWhZd3d27IcehPUkQKVvKV0lau00fc31hIPnDRn4qAev7GRD6PGmoyprsWlGb6PCxnMsra6dHf9K+9M5k++u+IohmzSpMSSOsz3axRAsQRPr9O9cS5tnWKCQAMvmztf3Hz1w5LM6fjn/nNNkWGolA30NTGPAOxJ5AVXNk4oSG/zB99f+eom/wAn/dPT/lT3zD4Z02ioKx8JkJHcan6P0MV4JPSGT6bl3vVXDkcgPeHPGmqrAfojpiqF2e6oPPTbvqyqyXZXCPhokWxUtQXooe0AoafTaiWbQFRlSBMagfzFM7dhQKEH7xaE7cYmCOqimWUEcAUpYGmmhA7tPGl7ntYVNWWsBE9YA1+tXCySndJHQJER4inCLdJ0VBSB0JkVcm1WBMSBrIkcQ6TVbglYQKs+kEdsVWuzE+qO0b/tWjNvxDiCgs8tvCqnLQx6qBHUUkHwNCYGYdtI/V2/Wh3bVXHtBHVOtaZ1hJEgLgc9B20I6wlIMKSUjeDxEdwoTC1z/9k=';
var imageSkyboxPosy = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABAAEADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAABAUCAwYAAQf/xAAsEAACAQMEAQMDAwUAAAAAAAABAgMABBEFEiExQRNRcQYiIxQygWGhwdHx/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAHhEAAgMAAgMBAAAAAAAAAAAAAAECESEDMRIiMgT/2gAMAwEAAhEDEQA/APrOvvGlsROMA8K2MnNY/eI5jsJI9zWv+pSDp0n25KsP+1jWjdH2kMG9iK9z8/yeTzfQ40W5wxQnB7yT4/3TeC4EhOGVEDbc+5rLxbt3sadaSIlnj3IdwPHzRnFdmhN9BV1JdWjJLtTaxxuB4/mm8U7vEH9PgdkniqLu3F3b8fcfAHmqNOMtrHcR3BDFRnvvj3qONFE2meJLHHPMHGUbot0T5xSq4gku532RFVPW7zinFpaMkEIf9yksR8+Kv4BIVcIBj5p06eAcW+y2Qwz27M4JTyPYisxqxt7pxMhKTJ9rhudwHkGn2l3olX0bnMchPG5QA3xQup6Wxn328TFfOMd/FJD1lTGn7LBHDGQaZ2aHAK991bZwyRE7omKnghl7o23t1V8qDtJ6PYqjkJGFBdjn0lUDmuli9WZvSXHufc0xt7Q+kABtHvRK2qxrtUcfFc/lRfxsWrGQm0Y/qaolh/Cyg8kYHFNpY8LkDOPFBzL2y8jHVGMgNA1zapLhRGOeyTioJp0f2l2JI7xwDR1egZpboaihLWFDkLRESLGCcAVJVx33Q+oTiK1LKeS2BW2To2IjJeS2zYD5HsakuorOxTaQ2MjnFKbyYvFuPOBigbRjNcbVd1wM5HOKquNUT89Hdy9y5LIHYAZIPII+Rz/alV5qk6RFVWRPBJOasje4t50KAoxGN2crIP8AFNNbgtpIElZkUN5Jx/FFUmZptYGgYrlGBmpY5rhXOUK7mT0oHfngcVn9Tc/jiG8yH7m+T4p9eyelEPJZgAKhJpsE0qSSAkqOee6pCSj2CSsX2+nj9IrSxuJCcsm7GBjurfpq3gNu7xlS28hiDyMdA04SJVOQBnGM45qC2sKybwoVs9rwTQc21oVGmUz6fHK37eByB4BrJayZkvDb3Mp2chGA4rdYO3HHzWU+o9OvJfyHaIwT1yQKfhdPROaOYf/Z';
var imageSkyboxNegy = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABAAEADASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAABQQDAgAB/8QAMRAAAQIFAgYABAUFAAAAAAAAAQIRAAMEEiExQSJRYXGRoRPR4fAUIzKBsSRCUmLx/8QAFwEBAQEBAAAAAAAAAAAAAAAAAQACBf/EABcRAQEBAQAAAAAAAAAAAAAAAAABEUH/2gAMAwEAAhEDEQA/AFaWnlololJSEgISkEnZxk94rkyEpSAZCAVY4vWnNo9SIdEpkBIWhyCHPV+Qx6hOQj8xwm5RGXOpwfHOOI6zCXTS0ZsdtAzDA11+cdppZeFKSnrz1Ps/xF8qSMqWonOpw/3nzG6ZWMOSd+X7QHBX4ZBb8tONMWmMl0yf1JShSLriAAC3Trn1DfwbWyWOhdwYnXIZ1AMnBcHaHVkBTaaWApCpaVEPnV89X6Y6xHOpkWLFhtX+kj/IAnu8Oz5XCEkAs4IIyM5+kH1UsfCVwhtSG3Ax5IMUCmiQk24L2gkdG+p8dISppZY8Lu7Z2ERUoZKLmDAO/MD6QtSpJQAxYqx0xAVEiWcMzg6vFCJT9cbnSPtOh2SA0VpAA0DCM2lGZLA48BhE02SWYM6jhx9/ZhRSQRlzt1iSenlFEHqJYIuDggb6kYLeiYMrEJCFLLG1yRsrDt98ocqAOI/7EjGmIHrwBSTFWschhvyHuNwPlCr+nRe7u+R68GGaUi9Lkggs+2cP4aA6FZ+EhBJBCQQ5bUGE6dZa1TgjmWcYgqhimUyUntFaSG26QXKmFKj30ipE0jhJY94zhVqUACf31iSeWCiSO0eXNLM+WbBiZc0O4LnoNPrF1J55DEO5d/EFVRNkxSQQyXzjZ9ewiypWChgzHGDlhB1YoFK9xYQXLuCNPcagS0a3lI4SzWgg6BvYi+QtQALJZ3Jf/nPSAqKclCUqUpFtqbgBu2WbfdukXU86WUkpmpJ2c55Mc/WNUHJE+0WEYOzb9ooROUkWgKG3EPnAsqo4NEKSeLBBCe/z7PGgny7WExBcYyz+IzYSpm6uC40YaxhOnqPDaOwMQLqJaWZSGOrt5/mOF1MtyEzLyx/vDFvvZ4pE3qZocXKSC22kG1cy9ExRKmJU5IASlIGnuOplQhJa4aZUF3E50+cRTZ9yEpVMQtTbe8hmzGhX/9k=';
var imageSkyboxPosz = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABAAEADASIAAhEBAxEB/8QAHAAAAgMAAwEAAAAAAAAAAAAABAUCAwYAAQcI/8QANhAAAQMDAQUGAQwDAAAAAAAAAQIDEQAEITEFEkFRgRMUQ2FxkfAGIiQyNEJEYpKx0eFScqH/xAAaAQACAwEBAAAAAAAAAAAAAAAAAQIDBAUG/8QAHxEAAgIBBQEBAAAAAAAAAAAAAAECUREDEhMxQSGh/9oADAMBAAIRAxEAPwD3Vi5bdO7C21/4LTBq1QkROtVB9lwAdokcqsGRqD5g10WjIQdtm3H2nVoSrcznnwopOlBovrcPFkuoDg1BVFHNbqshQPoaeH6LKfRMgk1zcyJzUwRzqt97skEoQHFRITOTUcUSXzs7K0oErBApTcXbL9wWGAXl6lIyBV7l12rX0si3QBJAcG9/IoNG2bS2PZ2LGPvKAkq6mrIwZCU16eZMfKHaLJPzjmKOR8qlOYftwfMYNIu2tT4qPeu+0tTo4n3rqyWizDFzRoEbX2es5ZVMffJI6Uc3tWwCYaLyCORNZVC7UeKj3oplyzzLyMedR2ad/o050aJG0nCsFF2+I0kmikXl06VFV06Z1gx+1JGXrIGe8NmPOmltdWSZ+kt+9QcdOxrfnoOat0rUCsqV1pxZ2rY+q2keZGaWWu0NnDW5ax+amlvtfZyB9pax+aqpzjnstjB0fJnfb0+Kv3rner4+Ms9aYps0hIGMDJHx61e3YyRAnOpNeRetKz0vHGhP21+fGc1jWu0vX4z27gH+1PRs8RET0gVZ3ABIO5BOciKXLKw2Roz/AHnaIH2l0dTUhe7SAMXLpjX51Pjs8RO6nhVfcJiUgK1B160uRv0HCNCYbS2onS6c/VUxtnao/FO/qpgqwkGQAfWqXLMpmEn0NNajsNio0LdpBISlXry+PKim7MKJBAgCM6f8pixbYMxIzkiJ6cuNGN28mCSRJgAST8fHlnbLUkKU2YySnpoT61aLPP1eImBPnTpFuQrBQAM84qzusJEiBnK1QBPH+6W4YiNlqd05yMVUqzGAcK1B0mtE5b7qVhagopiQFAdY46VBy2Gm7vIJ5cevMR/dGROjLuWYkkCZOfXz/ahXLMBMzuwcHiM6T/Naly13jhIVwhWaDdtQdRA3YMjI9edNSDB//9k=';
var imageSkyboxNegz = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABAAEADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAwUBBAYCAAf/xAA4EAABAwIDBAcFBwUAAAAAAAABAAIDBBEFITESQVFxExQVImGBkTJDU6HBBjNScoKS8EJEYrHh/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAECAwQGBf/EACARAAIBBAMAAwAAAAAAAAAAAAABAgMRElETIUEEI2H/2gAMAwEAAhEDEQA/ANXHK+F1hv3LRYBiTZn9WqXNaSO64nO48VXrcMjnO3CdgjhmEpmpZIjsyNcD+Jq6J4zX6eOsoO5vw94dsuANxk4fVcSxteRtNFxodViocWxGBjI2zl7GHIO/1fVeqMdxB59prRwDRl5rO/jyT6ZbzRsa2QMG04NDn2tyVGopJJ2yOADnAd0aZrP9t10hzeG2z7osjMx2siic2N0bC7MuPePzyRxyiNSUhhBhUTJukqdkRjO7jlyXqz7RUVIwxUMfTP0Ljk3/AKs5Uuqa2XpJ5nyuO9xyRqXDy8XDHSeJyb6qagn3Irzs7RORPLEbse9vJxUSYpUiwdMXeD2ArmSso3e+jHmqk09GdJmHz0Wv636VWkiZcRuc2R/pFlz2hT/1RjycqkklKTlKw38UAilPvmetlJRg/SLyXhdkxGAnutAChuI07TcgOP5VWZT0rh9831R2QUTb3lZ6qWFLZFuegnbbh93EDbS40Q5cXr5Qdl5Z+VQ5tCNJGeq7bLR/FYPNNKlH0T5H1Y+QdoV51nk9VHXMQPv5DbxTFlGCee/SyMyhuL2y8CuDdWWzsFCOhP09e738h/UvCWuIuJn+qfMoLgWZ8132eCLEAclF1ZbHhHQg6xiI/uJP3LwqcRGs8v7k/FALZNceW9DNA3M2+ifLLYYR0JDWYh8WRR16v+K/1TaSgZqRkTuCC6ibna3C9h/AmqsthhHRoY6Ue04utxvl9VbjojrYngbJnBTkgPY6997QQD5k68laipRqGx57gAc1mbZakKWUTSbloB/m5H6mSRYHw33TeOnGQc0Z6ak8rIvVTpdx3G4t80mwELqNv4b34aIb6KzdoaW4blojCzUFvgQ7a8jw5IL4Gkku7pvawOd+GueXNCYeGbkpDc2Fv8XAqrJSDa0Djr7RutNJTE5AWHDT5cSq0tO4d0xWB1BBA894TyCx/9k=';

// The "model" matrix is the "world" matrix in Standard Annotations
// and Semantics
var model = new Matrix4x4();
var view = new Matrix4x4();
var projection = new Matrix4x4();

var controller = null;

function main() {
    var c = document.getElementById("c");

    //c = WebGLDebugUtils.makeLostContextSimulatingCanvas(c);
    // tell the simulator when to lose context.
    //c.loseContextInNCalls(15);

    c.addEventListener('webglcontextlost', handleContextLost, false);
    c.addEventListener('webglcontextrestored', handleContextRestored, false);

	var ratio = window.devicePixelRatio ? window.devicePixelRatio : 1;
	c.width = 800 * ratio;
	c.height = 600 * ratio;
    gl = WebGLUtils.setupWebGL(c);
    if (!gl)
        return;
    g_width = c.width;
    g_height = c.height;
    controller = new CameraController(c);
    // Try the following (and uncomment the "pointer-events: none;" in
    // the index.html) to try the more precise hit detection
    //  controller = new CameraController(document.getElementById("body"), c, gl);
    controller.onchange = function(xRot, yRot) {
        draw();
    };
    init();
}

function log(msg) {
    if (window.console && window.console.log) {
        console.log(msg);
    }
}

function handleContextLost(e) {
    log("handle context lost");
    e.preventDefault();
    clearLoadingImages();
}

function handleContextRestored() {
    log("handle context restored");
    init();
}


function output(str) {
    document.body.appendChild(document.createTextNode(str));
    document.body.appendChild(document.createElement("br"));
}

function checkGLError() {
    var error = gl.getError();
    if (error != gl.NO_ERROR && error != gl.CONTEXT_LOST_WEBGL) {
        var str = "GL Error: " + error;
        output(str);
        throw str;
    }
}

function init() {
    gl.enable(gl.DEPTH_TEST);
    // Can use this to make the background opaque
    // gl.clearColor(0.3, 0.2, 0.2, 1.);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    initTeapot();
    initShaders();
    g_bumpTexture = loadTexture(baseUrl + "bump.jpg");
    g_envTexture = loadCubeMap("skybox", "jpg");
    draw();
}

function initTeapot() {
    g_vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, g_vbo);
    gl.bufferData(gl.ARRAY_BUFFER,
                  teapotPositions.byteLength +
                  teapotNormals.byteLength +
                  teapotTangents.byteLength +
                  teapotBinormals.byteLength +
                  teapotTexCoords.byteLength,
                  gl.STATIC_DRAW);
    g_normalsOffset = teapotPositions.byteLength;
    g_tangentsOffset = g_normalsOffset + teapotNormals.byteLength;
    g_binormalsOffset = g_tangentsOffset + teapotTangents.byteLength;
    g_texCoordsOffset = g_binormalsOffset + teapotBinormals.byteLength;
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, teapotPositions);
    gl.bufferSubData(gl.ARRAY_BUFFER, g_normalsOffset, teapotNormals);
    gl.bufferSubData(gl.ARRAY_BUFFER, g_tangentsOffset, teapotTangents);
    gl.bufferSubData(gl.ARRAY_BUFFER, g_binormalsOffset, teapotBinormals);
    gl.bufferSubData(gl.ARRAY_BUFFER, g_texCoordsOffset, teapotTexCoords);

    g_elementVbo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_elementVbo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, teapotIndices, gl.STATIC_DRAW);
    g_numElements = teapotIndices.length;
}

var bumpReflectVertexSource = [
    "attribute vec3 g_Position;",
    "attribute vec3 g_TexCoord0;",
    "attribute vec3 g_Tangent;",
    "attribute vec3 g_Binormal;",
    "attribute vec3 g_Normal;",
    "",
    "uniform mat4 world;",
    "uniform mat4 worldInverseTranspose;",
    "uniform mat4 worldViewProj;",
    "uniform mat4 viewInverse;",
    "",
    "varying vec2 texCoord;",
    "varying vec3 worldEyeVec;",
    "varying vec3 worldNormal;",
    "varying vec3 worldTangent;",
    "varying vec3 worldBinorm;",
    "",
    "void main() {",
    "  gl_Position = worldViewProj * vec4(g_Position.xyz, 1.);",
    "  texCoord.xy = g_TexCoord0.xy;",
    "  worldNormal = (worldInverseTranspose * vec4(g_Normal, 1.)).xyz;",
    "  worldTangent = (worldInverseTranspose * vec4(g_Tangent, 1.)).xyz;",
    "  worldBinorm = (worldInverseTranspose * vec4(g_Binormal, 1.)).xyz;",
    "  vec3 worldPos = (world * vec4(g_Position, 1.)).xyz;",
    "  worldEyeVec = normalize(worldPos - viewInverse[3].xyz);",
    "}"
    ].join("\n");

var bumpReflectFragmentSource = [
    "precision mediump float;\n",
    "const float bumpHeight = 0.2;",
    "",
    "uniform sampler2D normalSampler;",
    "uniform samplerCube envSampler;",
    "",
    "varying vec2 texCoord;",
    "varying vec3 worldEyeVec;",
    "varying vec3 worldNormal;",
    "varying vec3 worldTangent;",
    "varying vec3 worldBinorm;",
    "",
    "void main() {",
    "  vec2 bump = (texture2D(normalSampler, texCoord.xy).xy * 2.0 - 1.0) * bumpHeight;",
    "  vec3 normal = normalize(worldNormal);",
    "  vec3 tangent = normalize(worldTangent);",
    "  vec3 binormal = normalize(worldBinorm);",
    "  vec3 nb = normal + bump.x * tangent + bump.y * binormal;",
    "  nb = normalize(nb);",
    "  vec3 worldEye = normalize(worldEyeVec);",
    "  vec3 lookup = reflect(worldEye, nb);",
    "  vec4 color = textureCube(envSampler, lookup);",
    "  gl_FragColor = color;",
    "}"
    ].join("\n");

function loadShader(type, shaderSrc) {
    var shader = gl.createShader(type);
    // Load the shader source
    gl.shaderSource(shader, shaderSrc);
    // Compile the shader
    gl.compileShader(shader);
    // Check the compile status
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS) &&
        !gl.isContextLost()) {
        var infoLog = gl.getShaderInfoLog(shader);
        output("Error compiling shader:\n" + infoLog);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function initShaders() {
    var vertexShader = loadShader(gl.VERTEX_SHADER, bumpReflectVertexSource);
    var fragmentShader = loadShader(gl.FRAGMENT_SHADER, bumpReflectFragmentSource);
    // Create the program object
    var programObject = gl.createProgram();
    gl.attachShader(programObject, vertexShader);
    gl.attachShader(programObject, fragmentShader);
    // Bind attributes
    gl.bindAttribLocation(programObject, 0, "g_Position");
    gl.bindAttribLocation(programObject, 1, "g_TexCoord0");
    gl.bindAttribLocation(programObject, 2, "g_Tangent");
    gl.bindAttribLocation(programObject, 3, "g_Binormal");
    gl.bindAttribLocation(programObject, 4, "g_Normal");
    // Link the program
    gl.linkProgram(programObject);
    // Check the link status
    var linked = gl.getProgramParameter(programObject, gl.LINK_STATUS);
    if (!linked && !gl.isContextLost()) {
        var infoLog = gl.getProgramInfoLog(programObject);
        output("Error linking program:\n" + infoLog);
        gl.deleteProgram(programObject);
        return;
    }
    g_programObject = programObject;
    // Look up uniform locations
    g_worldLoc = gl.getUniformLocation(g_programObject, "world");
    g_worldInverseTransposeLoc = gl.getUniformLocation(g_programObject, "worldInverseTranspose");
    g_worldViewProjLoc = gl.getUniformLocation(g_programObject, "worldViewProj");
    g_viewInverseLoc = gl.getUniformLocation(g_programObject, "viewInverse");
    g_normalSamplerLoc = gl.getUniformLocation(g_programObject, "normalSampler");
    g_envSamplerLoc = gl.getUniformLocation(g_programObject, "envSampler");
    checkGLError();
}

function draw() {
    // Note: the viewport is automatically set up to cover the entire Canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    checkGLError();

    // For now, don't render if we have incomplete textures, just to
    // avoid accidentally incurring OpenGL errors -- although we should
    // be fully able to load textures in in the background
    if (g_pendingTextureLoads > 0) {
        return;
    }

    // Set up the model, view and projection matrices
    projection.loadIdentity();
    projection.perspective(45, g_width / g_height, 10, 500);
    view.loadIdentity();
    view.translate(0, -10, -100.0);

    // Add in camera controller's rotation
    model.loadIdentity();
    model.rotate(controller.xRot, 1, 0, 0);
    model.rotate(controller.yRot, 0, 1, 0);

    // Correct for initial placement and orientation of model
    model.translate(0, -10, 0);
    model.rotate(90, 1, 0, 0);

    gl.useProgram(g_programObject);

    // Compute necessary matrices
    var mvp = new Matrix4x4();
    mvp.multiply(model);
    mvp.multiply(view);
    mvp.multiply(projection);
    var worldInverseTranspose = model.inverse();
    worldInverseTranspose.transpose();
    var viewInverse = view.inverse();

    // Set up uniforms
    gl.uniformMatrix4fv(g_worldLoc, gl.FALSE, new Float32Array(model.elements));
    gl.uniformMatrix4fv(g_worldInverseTransposeLoc, gl.FALSE, new Float32Array(worldInverseTranspose.elements));
    gl.uniformMatrix4fv(g_worldViewProjLoc, gl.FALSE, new Float32Array(mvp.elements));
    gl.uniformMatrix4fv(g_viewInverseLoc, gl.FALSE, new Float32Array(viewInverse.elements));
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, g_bumpTexture);
    gl.uniform1i(g_normalSamplerLoc, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, g_envTexture);
    gl.uniform1i(g_envSamplerLoc, 1);
    checkGLError();

    // Bind and set up vertex streams
    gl.bindBuffer(gl.ARRAY_BUFFER, g_vbo);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, g_texCoordsOffset);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, g_tangentsOffset);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(3, 3, gl.FLOAT, false, 0, g_binormalsOffset);
    gl.enableVertexAttribArray(3);
    gl.vertexAttribPointer(4, 3, gl.FLOAT, false, 0, g_normalsOffset);
    gl.enableVertexAttribArray(4);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_elementVbo);
    checkGLError();
    gl.drawElements(gl.TRIANGLES, g_numElements, gl.UNSIGNED_SHORT, 0);
}

// Array of images curently loading
var g_loadingImages = [];

// Clears all the images currently loading.
// This is used to handle context lost events.
function clearLoadingImages() {
    for (var ii = 0; ii < g_loadingImages.length; ++ii) {
        g_loadingImages[ii].onload = undefined;
    }
    g_loadingImages = [];
}

function loadTexture(src) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    ++g_pendingTextureLoads;
    var image = new Image();
    image.crossOrigin = "anonymous";
    g_loadingImages.push(image);
    image.onload = function() {
        g_loadingImages.splice(g_loadingImages.indexOf(image), 1);
        --g_pendingTextureLoads;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(
            gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        checkGLError();
        draw();
    };
    image.src = imageBump; //src
    return texture;
}

function loadCubeMap(base, suffix) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    checkGLError();
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    checkGLError();
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    checkGLError();
    // FIXME: TEXTURE_WRAP_R doesn't exist in OpenGL ES?!
    //  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
    //  checkGLError();
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    checkGLError();
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    checkGLError();
    var faces = [["posx", gl.TEXTURE_CUBE_MAP_POSITIVE_X],
                 ["negx", gl.TEXTURE_CUBE_MAP_NEGATIVE_X],
                 ["posy", gl.TEXTURE_CUBE_MAP_POSITIVE_Y],
                 ["negy", gl.TEXTURE_CUBE_MAP_NEGATIVE_Y],
                 ["posz", gl.TEXTURE_CUBE_MAP_POSITIVE_Z],
                 ["negz", gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]];
    for (var i = 0; i < faces.length; i++) {
        var url = baseUrl + base + "-" + faces[i][0] + "." + suffix;
        switch(faces[i][0]){
            case 'posx':{
                url = imageSkyboxPosx;
                break;
            }
            case 'negx':{
                url = imageSkyboxNegx;
                break;
            }
            case 'posy':{
                url = imageSkyboxPosy;
                break;
            }
            case 'negy':{
                url = imageSkyboxNegy;
                break;
            }
            case 'posz':{
                url = imageSkyboxPosz;
                break;
            }
            case 'negz':{
                url = imageSkyboxNegz;
                break;
            }
            default:{
                url='';
                break;
            }
        }
        var face = faces[i][1];
        ++g_pendingTextureLoads;
        var image = new Image();
        image.crossOrigin = "anonymous";
        g_loadingImages.push(image);
        // Javascript has function, not block, scope.
        // See "JavaScript: The Good Parts", Chapter 4, "Functions",
        // section "Scope".
        image.onload = function(texture, face, image, url) {
            return function() {
                g_loadingImages.splice(g_loadingImages.indexOf(image), 1);
                --g_pendingTextureLoads;
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                gl.texImage2D(
                   face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                checkGLError();
                draw();
            }
        }(texture, face, image, url);
        image.src = url;
    }
    return texture;
}
