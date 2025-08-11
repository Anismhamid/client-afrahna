import React, {useState, useEffect, FunctionComponent} from "react";
import {
	Box,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Button,
	Typography,
	Pagination,
	CircularProgress,
	Card,
	CardContent,
	Chip,
	Stack,
} from "@mui/material";
import { searchServices } from "../../services/search";

interface Service {
	featureName: string;
	price: number;
}

interface Business {
	_id: string;
	businessName: string;
	category: string;
	address: {
		city: string;
		street?: string;
	};
	price: {
		min: number;
		max: number;
	};
	services?: Service[];
	description?: string;
	phone?: string;
	email?: string;
}

const categories = [
	"تزيين قاعات",
	"قاعات",
	"صالون الجمال",
	//  categories here
];

const cities = [
	"الناصرة",
	"ام الفحم",
	"تل أبيب",
	"القدس",
	//  cities here
];

const priceRanges = [
	{label: "0 - 200", min: 0, max: 200},
	{label: "201 - 500", min: 201, max: 500},
	{label: "501+", min: 501, max: Number.MAX_SAFE_INTEGER},
];

const SearchComponent: FunctionComponent = () => {
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState("");
	const [city, setCity] = useState("");
	const [priceRange, setPriceRange] = useState<{min: number; max: number} | null>(null);

	const [results, setResults] = useState<Business[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const handleSearch = async () => {
		setLoading(true);
		setError(null);

		try {
			const priceParam = priceRange
				? `${priceRange.min}-${
						priceRange.max === Number.MAX_SAFE_INTEGER ? "" : priceRange.max
				  }`
				: undefined;

			const response = await searchServices({
				q: query,
				category,
				location: city,
				price: priceParam,
				page,
				limit: 10,
			});

			setResults(response.data);
			setTotalPages(response.pages);
		} catch (e: any) {
			setError(e.message || "Error fetching search results");
		} finally {
			setLoading(false);
		}
	};

	// Trigger search when page changes or filters change
	useEffect(() => {
		handleSearch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const onPageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<Box maxWidth='900px' margin='auto' textAlign={"center"} padding={2}>
			<Typography variant='h5' gutterBottom >
				חיפוש שירותים/ספקי שירותים
			</Typography>

			<Box
				display='flex'
				flexWrap='wrap'
				gap={2}
				mb={3}
				alignItems='center'
				component='form'
				onSubmit={(e) => {
					e.preventDefault();
					setPage(1);
					handleSearch();
				}}
			>
				<TextField
					label='بحث'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					variant='outlined'
					fullWidth
					sx={{minWidth: 220}}
				/>

				<FormControl sx={{minWidth: 150}} size='small'>
					<InputLabel>الفئة</InputLabel>
					<Select
						value={category}
						label='الفئة'
						onChange={(e) => setCategory(e.target.value)}
					>
						<MenuItem value=''>
							<em>الكل</em>
						</MenuItem>
						{categories.map((cat) => (
							<MenuItem key={cat} value={cat}>
								{cat}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl sx={{minWidth: 150}} size='small'>
					<InputLabel>المدينة</InputLabel>
					<Select
						value={city}
						label='المدينة'
						onChange={(e) => setCity(e.target.value)}
					>
						<MenuItem value=''>
							<em>الكل</em>
						</MenuItem>
						{cities.map((c) => (
							<MenuItem key={c} value={c}>
								{c}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl sx={{minWidth: 150}} size='small'>
					<InputLabel>نطاق السعر</InputLabel>
					<Select
						value={priceRange ? `${priceRange.min}-${priceRange.max}` : ""}
						label='نطاق السعر'
						onChange={(e) => {
							const val = e.target.value;
							if (!val) return setPriceRange(null);
							const [minStr, maxStr] = val.split("-");
							setPriceRange({
								min: parseInt(minStr),
								max: maxStr ? parseInt(maxStr) : Number.MAX_SAFE_INTEGER,
							});
						}}
					>
						<MenuItem value=''>
							<em>الكل</em>
						</MenuItem>
						{priceRanges.map((range) => (
							<MenuItem
								key={range.label}
								value={`${range.min}-${
									range.max === Number.MAX_SAFE_INTEGER ? "" : range.max
								}`}
							>
								{range.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<Button
					type='submit'
					variant='contained'
					color='primary'
					sx={{height: 40}}
				>
					بحث
				</Button>
			</Box>

			{loading && (
				<Box display='flex' justifyContent='center' my={4}>
					<CircularProgress />
				</Box>
			)}

			{error && (
				<Typography color='error' variant='body1' mb={2}>
					{error}
				</Typography>
			)}

			{!loading && results.length === 0 && (
				<Typography variant='body1' mb={2}>
					אין תוצאות
				</Typography>
			)}

			<Stack spacing={2}>
				{results.map((business) => (
					<Card key={business._id}>
						<CardContent>
							<Typography variant='h6'>{business.businessName}</Typography>
							<Typography variant='body2' color='text.secondary' mb={1}>
								{business.category} - {business.address.city}
							</Typography>
							<Typography variant='body2' mb={1}>
								{business.description || "لا توجد وصف متاح"}
							</Typography>

							<Typography variant='body2' mb={1}>
								سعر من {business.price.min} إلى {business.price.max}
							</Typography>

							{business.services && business.services.length > 0 && (
								<Box mb={1}>
									<Typography variant='subtitle2'>الخدمات:</Typography>
									<Stack direction='row' spacing={1} flexWrap='wrap'>
										{business.services.map((srv) => (
											<Chip
												key={srv.featureName}
												label={`${srv.featureName} - ${srv.price}₪`}
												size='small'
											/>
										))}
									</Stack>
								</Box>
							)}

							<Typography variant='body2'>
								📞 {business.phone || "لا يوجد رقم هاتف"} | 📧{" "}
								{business.email || "لا يوجد بريد إلكتروني"}
							</Typography>
						</CardContent>
					</Card>
				))}
			</Stack>

			{totalPages > 1 && (
				<Box display='flex' justifyContent='center' mt={3}>
					<Pagination count={totalPages} page={page} onChange={onPageChange} />
				</Box>
			)}
		</Box>
	);
};

export default SearchComponent;
