import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
	const { manufacturer, year, model, limit, fuel } = filters;

	const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`;

	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "f237ccb57emsh52add6f66f26032p11ade9jsn90a0f9c2bbbf",
			"X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
		},
	};

	console.log(process.env.RAPID_API_KEY);

	try {
		const response = await fetch(url, options);

		const result = await response.json();

		return result;
	} catch (error) {
		console.log(error);
	}
}

export const calculateCarRent = (city_mpg: number, year: number) => {
	const basePricePerDay = 50; // Base rental price per day in dollars
	const mileageFactor = 0.1; // Additional rate per mile driven
	const ageFactor = 0.05; // Additional rate per year of vehicle age

	// Calculate additional rate based on mileage and age
	const mileageRate = city_mpg * mileageFactor;
	const ageRate = (new Date().getFullYear() - year) * ageFactor;

	// Calculate total rental rate per day
	const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

	return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
	const url = new URL("https://cdn.imagin.studio/getimage");

	const { make, year, model } = car;

	url.searchParams.append("customer", "hrjavascript-mastery");
	url.searchParams.append("make", make);
	url.searchParams.append("modelFamily", model.split(" ")[0]);
	url.searchParams.append("zoomType", "fullscreen");
	url.searchParams.append("modelYear", `${year}`);
	url.searchParams.append("angle", `${angle}`);

	return `${url}`;
};
