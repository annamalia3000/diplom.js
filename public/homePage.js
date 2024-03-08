"use strict";
//Выход из личного кабинета

const logoutButton = new LogoutButton;

logoutButton.action = () => ApiConnector.logout(response => {
    if (response.success) {
        location.reload();
    }
} );

// Получение информации о пользователе

ApiConnector.current(response => {
    if (response.success) {
        console.log(response);
        ProfileWidget.showProfile(response.data);
    }
} );

// Получение текущих курсов валюты

const ratesBoard = new RatesBoard;

const getRate = () => ApiConnector.getStocks(response => {
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data)
    }
})

setInterval(() => getRate, 60000);

// Операции с деньгами

const moneyManager = new MoneyManager;

// пополнение балансa
moneyManager.addMoneyCallback = cash => ApiConnector.addMoney(cash, response => {
    if (response.success) {
        console.log(response);
        ProfileWidget.showProfile(response.data)
    } else {
        moneyManage.setMessage(isSuccess, "Ошибка!")
    }
});

// конвертирование валюты
moneyManager.conversionMoneyCallback = cash => ApiConnector.convertMoney(cash, response => {
    if (response.success) {
        console.log(response);
        ProfileWidget.showProfile(response.data)
    } else {
        moneyManage.setMessage(isSuccess, "Ошибка!")
    }
});

// перевод валюты
moneyManager.sendMoneyCallback = cash => ApiConnector.transferMoney(cash, response => {
    if (response.success) {
        console.log(response);
        ProfileWidget.showProfile(response.data)
    } else {
        moneyManage.setMessage(isSuccess, "Ошибка!")
    }
});

// Работа с избранным

const favorites = new FavoritesWidget;

// начальный список избранного

ApiConnector.getFavorites(response => {
    if (response.success) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    } 
});

// добавления пользователя в список избранных

favorites.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favorites.setMessage(response, "Пользователь добавлен в избранное");
    } else {
        favorites.setMessage(response, "Ошибка!");
    }
});

// удаление пользователя из избранного

favorites.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favorites.setMessage(response, "Пользователь удален из избранного");
    } else {
        favorites.setMessage(response, "Ошибка!");
    }
});

