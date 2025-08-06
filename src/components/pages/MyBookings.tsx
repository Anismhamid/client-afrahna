import {FunctionComponent, useEffect, useState} from "react";
import {BookingData} from "../../interfaces/booking";
import {getVendorsBooks, myBookings} from "../../services/booking";
import {errorToast} from "../../atoms/notifications/Toasts";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {useUser} from "../../contextApi/useUserData";
import {getUserById} from "../../services/usersServices";
import {JwtPayload} from "../../interfaces/userSchema";
import {Link, useNavigate} from "react-router-dom";
import {handleDeletBook} from "../../helpers/vendors";
import {handleDeletCustomerBook} from "../../helpers/customers";
import HorizontalDevider from "../../atoms/customDeviders/HorizontalDevider";
import {useTranslation} from "react-i18next";
import changeDirection from "../../../locales/directions";

interface MyBookingsProps {}

const MyBookings: FunctionComponent<MyBookingsProps> = () => {
	const [books, setBooks] = useState<BookingData[]>([]);
	const [vendorBookings, setVendorBookings] = useState<BookingData[]>([]);
	const [users, setusers] = useState<JwtPayload[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();
	const {user} = useUser();

	const {t} = useTranslation();

	useEffect(() => {
		if (!user) {
			setLoading(false);
			return;
		}

		const fetchData = async () => {
			try {
				setLoading(true);
				const promises: Promise<any>[] = [];

				const myBookingsData = await myBookings(user._id);
				setBooks(myBookingsData);

				if (user?.role === "isVendor") {
					const vendorData = await getVendorsBooks(user._id);
					setVendorBookings(vendorData);

					const uniqueUserIds = [...new Set(vendorData.map((b) => b.userId))];
					const userDetails = await Promise.all(
						uniqueUserIds.map(async (id) => {
							try {
								return await getUserById(id);
							} catch (e) {
								console.warn(`Error fetching user ${id}`, e);
								return null;
							}
						}),
					);
					setusers(userDetails.filter(Boolean));
				}
				await Promise.all(promises);
			} catch (err) {
				errorToast("حدث خطأ");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [user?._id]);

	if (loading) {
		return (
			<div className='text-center mt-5'>
				<CircularProgress />
			</div>
		);
	}

	const handleDeleteBooking = async (
		bookToDelete: BookingData,
		isVendorBookibg: boolean,
	) => {
		try {
			if (isVendorBookibg) {
				await handleDeletBook(bookToDelete);
				setVendorBookings((prev) =>
					prev.filter((b) => b._id !== bookToDelete._id),
				);
			} else {
				await handleDeletCustomerBook(bookToDelete);
				setBooks((prev) => prev.filter((b) => b._id !== bookToDelete._id));
			}
		} catch (error) {
			errorToast(t("booking.cancelingError"));
		}
	};

	const sortedBooks = [...books].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	const dir = changeDirection()

	return (
		<div className='container' dir={dir}>
			<h1 className='text-center'>{t("afrahna.user.boogings")}</h1>
			<HorizontalDevider />
			<div className='my-5'>
				{books.length ? (
					<>
						{/* Desktop Table */}
						{sortedBooks.map((book) => (
							<div
								key={book._id}
								className='d-none d-md-block table-responsive my-5 border p-2'
							>
								<table className='table fw-bold table-striped text-end table-bordered'>
									<thead>
										<tr>
											<th colSpan={2}>
												{t("booking.BusinessName")}
											</th>
											<th colSpan={2}>
												{t("booking.BookingDate")}
											</th>
											<th colSpan={2}>{t("booking.status")}</th>
											<th colSpan={4}>
												{t("booking.requiredServices")}
											</th>
											<th colSpan={2}>{t("booking.procedure")}</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td colSpan={2}>{book.businessName}</td>
											<td colSpan={2}>
												{new Date(book.date).toLocaleDateString(
													"he-IL",
												)}
											</td>
											<td colSpan={2} className='text-danger'>
												{book.status}
											</td>
											<td colSpan={4}>
												<ul className='list-unstyled text-end'>
													{book.services?.map((s, idx) => (
														<li key={idx}>
															<Typography
																sx={{
																	backgroundColor:
																		"#e78300",
																	borderRadius: 5,
																	borderColor: "red",
																	mt: 2,
																	p: 1,
																}}
															>
																{s.featureName}
															</Typography>
														</li>
													))}
												</ul>
											</td>
											<td colSpan={2}>
												<Button
													color='error'
													variant='outlined'
													className='btn btn-danger'
													onClick={() => {
														handleDeleteBooking(book, false);
													}}
												>
													{t("booking.cancel")}
												</Button>
											</td>
										</tr>
									</tbody>
								</table>
								{book.note && book.note.trim() && (
									<Typography
										width={"100%"}
										variant='h6'
										sx={{
											backgroundColor: "aliceblue",
											borderRadius: 5,
											borderColor: "red",
										}}
									>
										<Typography color='success' variant='body1'>
											{t("booking.note")}
										</Typography>
										{book.note}
									</Typography>
								)}
							</div>
						))}
						{/* Mobile Cards */}
						<div className='d-block d-md-none'>
							{books.map((book) => (
								<div className='card mb-3 text-end' key={book._id}>
									<div className='card-body'>
										<h5 className='card-title'>
											{book.businessName}
										</h5>
										<p className='card-text'>
											📅{" "}
											{new Date(book.date).toLocaleDateString(
												"he-IL",
											)}
										</p>
										<p className='card-text'>
											{t("booking.status")}: {book.status}
										</p>
										{t("booking.requiredServices")}:
										<ul className='list-unstyled'>
											{book.services?.map((f, i) => (
												<li key={i}>- {f.featureName}</li>
											))}
										</ul>
										{book.note?.length !== 0 && (
											<Typography
												width={"100%"}
												variant='h6'
												sx={{
													backgroundColor: "aliceblue",
													borderRadius: 5,
													borderColor: "red",
												}}
											>
												<Typography
													color='success'
													variant='body1'
												>
													{t("booking.note")}
												</Typography>
												{book.note}
											</Typography>
										)}
										<Button
											color='error'
											variant='outlined'
											onClick={() =>
												handleDeleteBooking(book, false)
											}
										>
											{t("booking.cancel")}
										</Button>
									</div>
								</div>
							))}
						</div>
					</>
				) : (
					<div className='text-center mt-4 w-100'>
						<Typography>{t("booking.noHaveBooks")}</Typography>
						<Button
							type='button'
							color='success'
							size='large'
							variant='contained'
							className='mt-2'
							onClick={() => navigate("/")}
						>
							{t("globalVendorsPage.bookNow")}
						</Button>
					</div>
				)}

				{/* booking for vindor users */}
				{vendorBookings.length > 0 && (
					<>
						<h1 className='blink text-center'>{t("booking.Important")}</h1>
						<h2>{t("booking.vendorReservation")}</h2>
						<hr />
					</>
				)}
				<div className='text-center table-responsive '>
					{vendorBookings.length ? (
						vendorBookings.map((v, i) => {
							const bookingUser = users.find(
								(u) => u._id.toString() === v.userId,
							);

							return (
								<div key={`${v._id} ${+i}`}>
									<table className='table table-bordered rounded mb-5'>
										<thead>
											<tr>
												<th colSpan={4}>
													{t("booking.serviceApplicant")}
												</th>
												<th colSpan={3}>
													{t("booking.BookingDate")}
												</th>
												<th colSpan={4}>
													{t("usersManagement.phone")}
												</th>
												<th colSpan={2}>
													{t("booking.procedure")}
												</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td colSpan={4}>
													{bookingUser?.name
														? `${bookingUser?.name?.first} ${bookingUser.name.last}`
														: bookingUser?.businessName}
												</td>
												<td colSpan={4}>
													{new Date(v.date).toLocaleDateString(
														"he-IL",
													)}
												</td>
												<td colSpan={3}>
													<Link
														to={`tel:+974${bookingUser?.phone}`}
													>
														{bookingUser?.phone}
													</Link>
												</td>
												<td colSpan={1}>
													{bookingUser?._id && (
														<Button
															color='error'
															variant='outlined'
															className='btn btn-danger'
															onClick={() =>
																handleDeleteBooking(
																	v,
																	false,
																)
															}
														>
															{t("booking.cancel")}
														</Button>
													)}
												</td>
											</tr>
											<tr>
												<td colSpan={12}>
													<strong>
														{t("booking.requiredServices")}:
													</strong>
													<ul className='list-unstyled text-end'>
														{v.services.map((s, idx) => (
															<li key={idx}>
																- {s.featureName}
															</li>
														))}
													</ul>
												</td>
											</tr>
										</tbody>
									</table>
									{v.note?.length !== 0 && (
										<Typography
											width={"100%"}
											variant='h6'
											sx={{
												backgroundColor: "aliceblue",
												borderRadius: 5,
												overflow: "hidden",
												textAlign: "center",
												p: 3,
											}}
										>
											<Typography color='success' variant='body1'>
												{t("booking.note")}
											</Typography>
											{v.note}
										</Typography>
									)}
								</div>
							);
						})
					) : (
						<Box>
							{user?.role === "isVendor" && (
								<Typography variant='h5' color='textSecondary'>
									{t("booking.noHaveBooks")}
								</Typography>
							)}
						</Box>
					)}
				</div>
			</div>
		</div>
	);
};

export default MyBookings;