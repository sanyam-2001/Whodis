const JWTGET = async (path) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `BEARER ${localStorage.getItem('JWTTOKEN')}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch(path, requestOptions);
    const parsedJWT = await response.json();
    return parsedJWT;
}

export default JWTGET