// ФУНКЦИЯ СЧИТАЕТ ПРОМЕЖУТОК ВРЕМЕНИ с даты выплнения работы, за который должна решаться проблема
function AutoTiming(TimeStatistic) { // Статистика предыдущих сроков и текущий срок выполнения от назначения сроков в сутках
    let sum = 0.0;
    let sr = 0.0;
    for (let i = 0; i < 10; i++){
        sum += TimeStatistic[i];
    }
    sr = sum / 10;
    //console.log(Math.ceil(sr), ' суток');
    return Math.ceil(sr);
}

function AddTimeToStatistic(TimeStatistic, currTime) { // Если в статистике уже 10 элементов, то совершим хитрое схлопывание статистики до 10 элементов с добавлением в статистику нового значения
    if (TimeStatistic.length < 10) {
        TimeStatistic.push(currTime);
    } else {
        let sum = 0.0;
        let sr = 0.0;
        for (let i = 0; i < 10; i++){
            sum += TimeStatistic[i];
        }
        sum += currTime;
        sr = sum / 11;
        TimeStatistic.push(currTime);
        let iMin = -1;
        let Min = 100.0;
        for (let i = 0; i < 11; i++) {
            if (Math.abs(sr - TimeStatistic[i]) < Min){
                Min = TimeStatistic[i];
                iMin = i;
            }
        }
        let R = Min - sr;
        TimeStatistic.splice(iMin, 1);
        for (let i = 0; i < 10; i++) {
            TimeStatistic[i] += R/10;
        }
    }
    //for (let i = 0; i < TimeStatistic.length; i++){
    //    console.log(i+1, ') ', TimeStatistic[i]);
    //}
    return TimeStatistic;
}

// РЕАЛИЗАЦИЯ СИСТЕМЫ РАССТАНОВКИ ПРИОРИТЕТОВ ИСПРАВЛЕНИЯ ДЕФЕКТОВ И ФОРМИРОВАНИЕ СРОКОВ
function CalculatePriority(techCond, consRef) {
    var priorityMatrix = [ [1, 2, 4, 7], [3, 5, 8, 11], [6, 9, 12, 15], [10, 13, 16, 18], [14, 17, 19, 20]]; // таблица приоритетов
    var techCondID, consRefID;

    // расчёт ID технического состояния объекта
    if (techCond <= 25){ techCondID = 1; } // критическое
    if (techCond <= 50 && techCond > 25){ techCondID = 2; } // неудовлетворительное
    if (techCond <= 70 && techCond > 50){ techCondID = 3; } // удовлетворительное
    if (techCond <= 85 && techCond > 70){ techCondID = 4; } // хорошее
    if (techCond <= 100 && techCond > 85){ techCondID = 5; } // очень хорошее

    // расчёт ID последствий отказа объекта
    if (consRef < 30.0){ consRefID = 4; } // очень хорошее
    if (consRef < 50.0 && consRef >= 30.0){ consRefID = 3; } // хорошее
    if (consRef < 85.0 && consRef >= 50.0){ consRefID = 2; } // удовлетворительное
    if (consRef <= 100.0 && consRef >= 85.0){ consRefID = 1; } // неудовлетворительное

    return priorityMatrix[techCondID-1][consRefID-1]; // ищем согласно таблице приоритетов
}

function CalculateTimeCompliting(dateYear, priority){ // Интересуют только год
    var timingTable = [1, 1, 2, 3, 3, 5, 6, 6, 7, 8, 8, 9];
    return timingTable[priority-1]+dateYear;
}

///*
console.log('Time to complite: ' ,AutoTiming(AddTimeToStatistic([2.0, 3.0, 2.2, 2.8, 2.4, 2.6, 2.5, 2.5, 3.0, 2.0], 2.2))); // тест
console.log('Priority: ', CalculatePriority(55, 71.1)); // тест
var date = new Date(2020, 10, 18); // тест
console.log('Timing of Compliting: ', CalculateTimeCompliting( date.getFullYear(), CalculatePriority(55, 71.1))); //тест
//*/