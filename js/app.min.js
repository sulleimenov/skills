document.addEventListener("DOMContentLoaded", function () {
	// Получаем все вкладки и контент
	const tabs = document.querySelectorAll('.tabs__item');
	const tabContents = document.querySelectorAll('.tabs-content__item');

	// Функция для активации вкладки и соответствующего контента
	function activateTab(tabIndex) {
			// Убираем класс active у всех вкладок
			tabs.forEach(t => t.classList.remove('active'));
			tabContents.forEach(content => content.classList.remove('active'));

			// Добавляем класс active на вкладку и контент
			tabs[tabIndex].classList.add('active');
			tabContents[tabIndex].classList.add('active');
	}

	// Добавляем обработчики клика для каждой вкладки
	tabs.forEach((tab, index) => {
			tab.addEventListener('click', () => {
					activateTab(index);
			});
	});

	// Устанавливаем первый день активным по умолчанию
	activateTab(0);
});
