import {FunctionComponent, useEffect, useState} from "react";
import {errorToast} from "../../../atoms/notifications/Toasts";
import {getAllVendors} from "../../../services/vendorServices";
import {JwtPayload} from "../../../interfaces/userSchema";
import {Link} from "react-router-dom";
import {useUser} from "../../../contextApi/useUserData";
import { useTranslation } from "react-i18next";

interface VendorsTableProps {}

const VendorsTable: FunctionComponent<VendorsTableProps> = () => {
	const [vendors, setVendors] = useState<JwtPayload[]>([]);
	const {user} = useUser();
	const {t} = useTranslation();

	useEffect(() => {
		if (user?.role !== "admin") return;
		getAllVendors()
			.then(setVendors)
			.catch((err: any) => errorToast(err.response?.message));
	}, []);

	return (
		<main>
			<div className='container  text-center pt-5'>
				<h1 className=' my-5'>{t("usersManagement.vendorsTable")}</h1>
				{vendors.length === 0 ? (
					<p>{t("usersManagement.noVendors")}</p>
				) : (
					<div className='table-responsive'>
						<Link className='btn btn-primary my-3' to={`/manage/users`}>
							{t("usersManagement.usersProviderManagement")}
						</Link>
						<table className={"table table-striped table-danger"}>
							<thead>
								<tr>
									<th>{t("registerPage.fName")}</th>
									<th>{t("registerPage.email")}</th>
									<th>{t("usersManagement.phone")}</th>
									<th>{t("usersManagement.edit")}</th>
									<th>{t("usersManagement.delete")}</th>
								</tr>
							</thead>
							<tbody>
								{vendors.map((vendor) => (
									<tr key={vendor._id}>
										<td>{vendor.businessName}</td>
										<td>{vendor.email}</td>
										<td>
											<Link to={`tel:+974${vendor.phone}`}>
												{vendor.phone}
											</Link>
										</td>
										<td>
											<button
												className='btn btn-warning'
												onClick={() => {}}
											>
												تعديل
											</button>
										</td>
										<td>
											<button
												className='btn btn-danger'
												onClick={() => {}}
											>
												حذف
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</main>
	);
};

export default VendorsTable;
