import { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/helpers";
import { Dog } from "../utils/types";
import { Grid2 as Grid, Typography } from "@mui/material";

export default function DogsPage({
  initialDogIds,
}: {
  initialDogIds: string[];
}) {
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchInitialDogsFromIds = async () => {
      const resp = await fetchFromAPI("/dogs", {
        method: "POST",
        body: initialDogIds,
      });
      const data = await resp.json();
      setDogs(data);
    };

    fetchInitialDogsFromIds();
  }, [initialDogIds]);

  return (
    <Grid container columns={5}>
      {dogs.map((dog) => (
        <Grid
          size={1}
          className="flex-column"
          style={{ alignItems: "center", marginBottom: "15px" }}
        >
          <img className="cropped-img" src={dog.img} />
          <Typography variant="h6">
            {dog.name} ({dog.age} y.o.)
          </Typography>
          <Typography variant="subtitle1">
            <span style={{ fontStyle: "italic" }}>{dog.breed}</span>{" "}
            <span style={{ color: "gray" }}>
              (
              <a
                href={`https://www.google.com/maps/place/${dog.zip_code}`}
                target="_blank"
              >
                {dog.zip_code}
              </a>
              )
            </span>
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
