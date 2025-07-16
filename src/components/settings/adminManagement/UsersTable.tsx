import {FunctionComponent, useEffect, useState} from "react";
import {errorToast} from "../../../atoms/notifications/Toasts";
import {getAllUsers} from "../../../services/usersServices";
import {JwtPayload} from "../../../interfaces/userSchema";
import {Link} from "react-router-dom";
import {useUser} from "../../../contextApi/useUserData";
import {useTranslation} from "react-i18next";

interface UsersTableProps {}

const UsersTable: FunctionComponent<UsersTableProps> = () => {
	const [users, setUsers] = useState<JwtPayload[]>([]);
	const {user} = useUser();
	const {t} = useTranslation();
	useEffect(() => {
		if (user?.role !== "admin") return;
		getAllUsers()
			.then(setUsers)
			.catch((err: any) => errorToast(err.response?.message));
	}, []);
	return (
		<main>
			<div className='container text-center pt-5'>
				<h1 className=' my-5'>{t("usersManagement.usersTable")}</h1>
				{users.length === 0 ? (
					<p>{t("usersManagement.noUsers")}</p>
				) : (
					<div className='table-responsive'>
						<Link className='btn btn-primary my-3' to={`/manage/vendors`}>
							{t("usersManagement.vendorsProviderManagement")}
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
								{users.map((user) => (
									<tr key={user._id}>
										<td>
											{user.name.first}, {user.name.last}
										</td>
										<td>{user.email}</td>
										<td>
											<Link to={`tel:+974${user.phone}`}>
												{user.phone}
											</Link>
										</td>
										<td>
											<button
												className='btn btn-warning'
												onClick={() => {}}
											>
												{t("usersManagement.edit")}
											</button>
										</td>
										<td>
											<button
												className='btn btn-danger'
												onClick={() => {}}
											>
												{t("usersManagement.delete")}
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

export default UsersTable;
