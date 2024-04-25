import { useEffect, useState } from "react";
import {
	HeadePage,
	TableCategoryAdmin,
	AddEditCategoryForm,
} from "../../components/Admin";
import { useCategory } from "../../hooks";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common";

export function CategoriesAdmin() {
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState(null);
	const [contentModal, setContentModal] = useState(null);
	const { loading, categories, getCategories } = useCategory();

	const openCloseModal = () => {
		setShowModal((prev) => !prev);
	};

	const addCategory = () => {
		setTitleModal("Nueva categoria");
		setContentModal(<AddEditCategoryForm />);
		openCloseModal();
	};

	useEffect(() => {
		getCategories();
	}, []);
	return (
		<>
			<HeadePage
				btnClick={addCategory}
				title="Categories"
				btnTitle="New category"
			/>
			{loading ? (
				<Loader active inline="centered">
					Loading...
				</Loader>
			) : (
				<TableCategoryAdmin categories={categories} />
			)}

			<ModalBasic
				show={showModal}
				onClose={openCloseModal}
				title={titleModal}
				children={contentModal}
			/>
		</>
	);
}