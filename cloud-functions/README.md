Cloud functions providing access to 3rd-party real estate API and own scraped crossfit gym location data

To run you have to set the zoopla api key through process.env.ZOOPLA_API_KEY

To deploy, make sure latest typescript is compiled
`npm run compile`
then deploy from command line using gcloud sdk
`gcloud functions deploy getCrossfits --project=crossfit-homes --runtime=nodejs12 --trigger-http --region=europe-west1`

`gcloud functions deploy getZoopla --project=crossfit-homes --runtime=nodejs12 --trigger-http --set-env-vars=PLACES_CLIENT_ID=[], PLACES_CLIENT_SECRET=[] --region=europe-west1`

normally I'd deploy these cloud functions through a CICD pipeline


The cloud functions can be accessed as API endpoints at
https://europe-west1-crossfit-homes.cloudfunctions.net/getCrossfits 
and
https://europe-west1-crossfit-homes.cloudfunctions.net/getZoopla 
but access is restricted to authenticated users