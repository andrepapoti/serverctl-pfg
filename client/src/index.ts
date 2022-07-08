type MyRequest = {
  method: string;
  headers: { "content-type": string };
  body?: string;
};

type RequestData = {
  id: number;
  request: any;
  sendTimeStamp?: number;
  receivedTimeStamp?: number;
  responseTime?: number;
  response?: any;
};

const sleep = (ms: number): Promise<void> =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise((f) => setTimeout(f, ms));

const createRequest = (body: number): MyRequest => {
  const x = {
    method: body % 10 === 0 ? "POST" : "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: body % 10 === 0 ? `${body + 1}` : undefined,
  };

  return x;
};

const logResponse = (data: RequestData): void => {
  switch (data.request.method) {
    case "GET":
      console.log("## GET: ", data.response);
      break;
    case "POST":
      console.log("## POST OK:");
      break;
    default:
      console.log("!! Unknown method");
  }

  if (data.receivedTimeStamp !== undefined && data.sendTimeStamp !== undefined)
    console.log(
      "Response time: ",
      data.receivedTimeStamp - data.sendTimeStamp,
      "ms\n"
    );
  else console.log("Invalid time stamp");
};

const executeRequests = async (): Promise<void> => {
  const numberOfRequests = 100;
  const delayBetweenRequests = 400;
  const requests: RequestData[] = [];
  for (let i = 0; i < numberOfRequests; i += 1) {
    requests.push({
      id: i,
      request: createRequest(i),
    });
  }

  const promiseArray: Promise<void>[] = [];

  // eslint-disable-next-line no-undef
  for (let i = 0; i < numberOfRequests; i += 1) {
    requests[i].sendTimeStamp = performance.now();
    promiseArray.push(
      fetch("http://34.121.242.204:5000", requests[i].request)
        .then((response) => {
          requests[i].receivedTimeStamp = performance.now();

          return response.text();
        })
        .then((data) => {
          requests[i].response = data;
          logResponse(requests[i]);
        })
        .catch((error) => {
          console.error("Error on request", i, error, requests[i]);
        })
    );

    // eslint-disable-next-line no-await-in-loop
    await sleep(delayBetweenRequests);
  }

  await Promise.all(promiseArray);

  const totalTime = requests.reduce((acc, request) => {
    if (request.sendTimeStamp === undefined) return acc;
    if (request.receivedTimeStamp === undefined) return acc;
    const responseTime: number =
      request.receivedTimeStamp - request.sendTimeStamp;
    console.log(responseTime);
    return acc + responseTime;
  }, 0);

  console.log("# Average response time: ", totalTime / numberOfRequests, "ms");
};

executeRequests();
