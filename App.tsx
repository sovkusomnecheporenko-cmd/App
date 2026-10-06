import React, { useState } from 'react';

import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Student = {
  id: string;
  name: string;
  group: string;
  course: string;
};

const initialStudents: Student[] = [
  {
    id: '1',
    name: 'Аружан Сейтова',
    group: 'IS-21',
    course: 'Information Systems',
  },
  {
    id: '2',
    name: 'Диас Нурланов',
    group: 'CS-22',
    course: 'Computer Science',
  },
  {
    id: '3',
    name: 'Амина Ермекова',
    group: 'SE-23',
    course: 'Software Engineering',
  },
  {
    id: '4',
    name: 'Иван Петров',
    group: 'IT-21',
    course: 'Information Technology',
  },
];

type StudentCardProps = {
  student: Student;
  onDelete: (id: string) => void;
};

function StudentCard({
  student,
  onDelete,
}: StudentCardProps) {
  return (
    <View style={styles.studentCard}>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {student.name.charAt(0)}
        </Text>
      </View>

      <View style={styles.studentContent}>
        <Text
          style={styles.studentName}
          numberOfLines={1}
        >
          {student.name}
        </Text>

        <Text style={styles.studentCourse}>
          {student.course}
        </Text>

        <View style={styles.groupBadge}>
          <Text style={styles.groupText}>
            {student.group}
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.deleteButton}
        onPress={() => onDelete(student.id)}
      >
        <Text style={styles.deleteText}>
          ×
        </Text>
      </Pressable>

    </View>
  );
}

export default function App() {

  const [students, setStudents] =
    useState<Student[]>(initialStudents);

  const [search, setSearch] = useState('');

  const [activeTab, setActiveTab] =
    useState('home');

  const [modalVisible, setModalVisible] =
    useState(false);

  const [name, setName] = useState('');

  const [group, setGroup] = useState('');

  const [course, setCourse] = useState('');

  const filteredStudents =
    students.filter((student) =>
      student.name
        .toLowerCase()
        .includes(
          search.trim().toLowerCase()
        )
    );

  const addStudent = () => {

    if (
      !name.trim() ||
      !group.trim() ||
      !course.trim()
    ) {

      Alert.alert(
        'Не заполнено',
        'Заполните все поля'
      );

      return;
    }

    const newStudent: Student = {
      id: Date.now().toString(),
      name: name.trim(),
      group: group.trim(),
      course: course.trim(),
    };

    setStudents((current) => [
      ...current,
      newStudent,
    ]);

    setName('');
    setGroup('');
    setCourse('');

    setModalVisible(false);

    Alert.alert(
      'Готово!',
      'Студент успешно добавлен'
    );
  };

  const deleteStudent = (id: string) => {

    Alert.alert(
      'Удаление',
      'Удалить студента из списка?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            setStudents((current) =>
              current.filter(
                (student) =>
                  student.id !== id
              )
            );
          },
        },
      ]
    );
  };

  const renderHome = () => {

    return (
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.listContainer
        }

        ListHeaderComponent={
          <View>

            {/* HEADER */}

            <View style={styles.header}>

              <View>

                <Text style={styles.overline}>
                  CAMPUS
                </Text>

                <Text style={styles.headerTitle}>
                  Привет! 👋
                </Text>

                <Text style={styles.headerSubtitle}>
                  Добро пожаловать в Campus
                </Text>

              </View>

              <View style={styles.profile}>
                <Text style={styles.profileText}>
                  S
                </Text>
              </View>

            </View>


            {/* MAIN CARD */}

            <View style={styles.heroCard}>

              <View style={styles.heroContent}>

                <Text style={styles.heroSmall}>
                  МОЁ ОБУЧЕНИЕ
                </Text>

                <Text style={styles.heroTitle}>
                  Управляй учёбой
                  проще
                </Text>

                <Text style={styles.heroText}>
                  Студенты, расписание
                  и учебная информация
                  в одном месте.
                </Text>

              </View>

              <Text style={styles.heroEmoji}>
                🎓
              </Text>

            </View>


            {/* STATISTICS */}

            <Text style={styles.sectionTitle}>
              Обзор
            </Text>

            <View style={styles.stats}>

              <View style={styles.statCard}>

                <View style={styles.statIcon}>
                  <Text>👥</Text>
                </View>

                <Text style={styles.statNumber}>
                  {students.length}
                </Text>

                <Text style={styles.statLabel}>
                  Студентов
                </Text>

              </View>


              <View style={styles.statCard}>

                <View style={styles.statIcon}>
                  <Text>📚</Text>
                </View>

                <Text style={styles.statNumber}>
                  {
                    new Set(
                      students.map(
                        (item) => item.group
                      )
                    ).size
                  }
                </Text>

                <Text style={styles.statLabel}>
                  Групп
                </Text>

              </View>


              <View style={styles.statCard}>

                <View style={styles.statIcon}>
                  <Text>🔎</Text>
                </View>

                <Text style={styles.statNumber}>
                  {filteredStudents.length}
                </Text>

                <Text style={styles.statLabel}>
                  Найдено
                </Text>

              </View>

            </View>


            {/* QUICK ACTIONS */}

            <Text style={styles.sectionTitle}>
              Быстрые действия
            </Text>

            <View style={styles.actions}>

              <Pressable
                style={styles.actionCard}
                onPress={() =>
                  setModalVisible(true)
                }
              >

                <View style={styles.actionIcon}>
                  <Text>＋</Text>
                </View>

                <Text style={styles.actionTitle}>
                  Добавить
                </Text>

                <Text style={styles.actionText}>
                  Новый студент
                </Text>

              </Pressable>


              <Pressable
                style={styles.actionCard}
                onPress={() =>
                  setActiveTab('students')
                }
              >

                <View style={styles.actionIconBlue}>
                  <Text>👥</Text>
                </View>

                <Text style={styles.actionTitle}>
                  Студенты
                </Text>

                <Text style={styles.actionText}>
                  Открыть список
                </Text>

              </Pressable>

            </View>


            {/* TODAY */}

            <View style={styles.todayHeader}>

              <Text style={styles.sectionTitle}>
                Сегодня
              </Text>

              <Text style={styles.todayDate}>
                06 ОКТ
              </Text>

            </View>


            <View style={styles.scheduleCard}>

              <View style={styles.timeBox}>
                <Text style={styles.time}>
                  09:00
                </Text>

                <View style={styles.line} />
              </View>

              <View>
                <Text style={styles.lesson}>
                  Mobile UI Design
                </Text>

                <Text style={styles.lessonInfo}>
                  Кабинет 305 • Практика
                </Text>
              </View>

            </View>


            <View style={styles.scheduleCard}>

              <View style={styles.timeBox}>
                <Text style={styles.time}>
                  12:00
                </Text>

                <View style={styles.line} />
              </View>

              <View>
                <Text style={styles.lesson}>
                  React Native
                </Text>

                <Text style={styles.lessonInfo}>
                  Кабинет 412 • Лекция
                </Text>
              </View>

            </View>

          </View>
        }

        renderItem={() => null}

        ListFooterComponent={
          <View style={styles.homeFooter}>
            <Text style={styles.footerText}>
              Campus • Mobile UI Project
            </Text>
          </View>
        }
      />
    );
  };


  const renderStudents = () => {

    return (
      <View style={styles.pageContainer}>

        <View style={styles.pageHeader}>

          <View>
            <Text style={styles.overline}>
              CAMPUS
            </Text>

            <Text style={styles.pageTitle}>
              Студенты
            </Text>
          </View>

          <Pressable
            style={styles.plusButton}
            onPress={() =>
              setModalVisible(true)
            }
          >
            <Text style={styles.plusText}>
              +
            </Text>
          </Pressable>

        </View>


        <View style={styles.searchBox}>

          <Text style={styles.searchIcon}>
            🔎
          </Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Поиск студента..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <Pressable
              onPress={() => setSearch('')}
            >
              <Text style={styles.clear}>
                ×
              </Text>
            </Pressable>
          )}

        </View>


        <Text style={styles.resultsText}>
          {filteredStudents.length} студентов
        </Text>


        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          renderItem={({ item }) => (
            <StudentCard
              student={item}
              onDelete={deleteStudent}
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>
                🔍
              </Text>

              <Text style={styles.emptyTitle}>
                Ничего не найдено
              </Text>

              <Text style={styles.emptyText}>
                Попробуйте другой запрос
              </Text>
            </View>
          }
        />

      </View>
    );
  };


  const renderSchedule = () => {

    return (
      <View style={styles.pageContainer}>

        <Text style={styles.overline}>
          CAMPUS
        </Text>

        <Text style={styles.pageTitle}>
          Расписание
        </Text>

        <Text style={styles.pageSubtitle}>
          Вторник, 6 октября
        </Text>


        <View style={styles.daySelector}>

          <View style={styles.dayActive}>
            <Text style={styles.dayNumberActive}>
              06
            </Text>

            <Text style={styles.dayNameActive}>
              ВТ
            </Text>
          </View>

          <View style={styles.day}>
            <Text style={styles.dayNumber}>
              07
            </Text>

            <Text style={styles.dayName}>
              СР
            </Text>
          </View>

          <View style={styles.day}>
            <Text style={styles.dayNumber}>
              08
            </Text>

            <Text style={styles.dayName}>
              ЧТ
            </Text>
          </View>

          <View style={styles.day}>
            <Text style={styles.dayNumber}>
              09
            </Text>

            <Text style={styles.dayName}>
              ПТ
            </Text>
          </View>

        </View>


        <View style={styles.scheduleLarge}>

          <Text style={styles.scheduleTime}>
            09:00
          </Text>

          <View>

            <Text style={styles.scheduleTitle}>
              Mobile UI Design
            </Text>

            <Text style={styles.scheduleDescription}>
              Проектирование интерфейса
            </Text>

            <Text style={styles.scheduleRoom}>
              📍 Кабинет 305
            </Text>

          </View>

        </View>


        <View style={styles.scheduleLarge}>

          <Text style={styles.scheduleTime}>
            12:00
          </Text>

          <View>

            <Text style={styles.scheduleTitle}>
              React Native
            </Text>

            <Text style={styles.scheduleDescription}>
              Разработка мобильных приложений
            </Text>

            <Text style={styles.scheduleRoom}>
              📍 Кабинет 412
            </Text>

          </View>

        </View>


        <View style={styles.scheduleLarge}>

          <Text style={styles.scheduleTime}>
            15:00
          </Text>

          <View>

            <Text style={styles.scheduleTitle}>
              Database
            </Text>

            <Text style={styles.scheduleDescription}>
              Практическое занятие
            </Text>

            <Text style={styles.scheduleRoom}>
              📍 Кабинет 208
            </Text>

          </View>

        </View>

      </View>
    );
  };


  const renderProfile = () => {

    return (
      <View style={styles.pageContainer}>

        <Text style={styles.overline}>
          CAMPUS
        </Text>

        <Text style={styles.pageTitle}>
          Профиль
        </Text>


        <View style={styles.profileCard}>

          <View style={styles.bigAvatar}>
            <Text style={styles.bigAvatarText}>
              S
            </Text>
          </View>

          <Text style={styles.profileName}>
            Student
          </Text>

          <Text style={styles.profileGroup}>
            Группа IS-21
          </Text>

        </View>


        <Text style={styles.sectionTitle}>
          Настройки
        </Text>


        <View style={styles.settingsCard}>

          <Pressable style={styles.setting}>
            <Text style={styles.settingIcon}>
              🔔
            </Text>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Уведомления
              </Text>

              <Text style={styles.settingDescription}>
                Получать уведомления
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </Pressable>


          <Pressable style={styles.setting}>
            <Text style={styles.settingIcon}>
              🌙
            </Text>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Тёмная тема
              </Text>

              <Text style={styles.settingDescription}>
                Внешний вид приложения
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </Pressable>


          <Pressable style={styles.setting}>
            <Text style={styles.settingIcon}>
              ⚙️
            </Text>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Настройки
              </Text>

              <Text style={styles.settingDescription}>
                Общие параметры
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </Pressable>


          <Pressable style={styles.setting}>
            <Text style={styles.settingIcon}>
              ℹ️
            </Text>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                О приложении
              </Text>

              <Text style={styles.settingDescription}>
                Campus v1.0
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </Pressable>

        </View>

      </View>
    );
  };


  const renderScreen = () => {

    if (activeTab === 'students') {
      return renderStudents();
    }

    if (activeTab === 'schedule') {
      return renderSchedule();
    }

    if (activeTab === 'profile') {
      return renderProfile();
    }

    return renderHome();
  };


  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="dark-content"
      />

      <View style={styles.screen}>
        {renderScreen()}
      </View>


      {/* BOTTOM NAVIGATION */}

      <View style={styles.bottomNav}>

        <Pressable
          style={styles.navItem}
          onPress={() =>
            setActiveTab('home')
          }
        >
          <Text style={[
            styles.navIcon,
            activeTab === 'home' &&
              styles.navIconActive,
          ]}>
            ⌂
          </Text>

          <Text style={[
            styles.navText,
            activeTab === 'home' &&
              styles.navTextActive,
          ]}>
            Главная
          </Text>
        </Pressable>


        <Pressable
          style={styles.navItem}
          onPress={() =>
            setActiveTab('students')
          }
        >
          <Text style={[
            styles.navIcon,
            activeTab === 'students' &&
              styles.navIconActive,
          ]}>
            ♙
          </Text>

          <Text style={[
            styles.navText,
            activeTab === 'students' &&
              styles.navTextActive,
          ]}>
            Студенты
          </Text>
        </Pressable>


        <Pressable
          style={styles.navItem}
          onPress={() =>
            setActiveTab('schedule')
          }
        >
          <Text style={[
            styles.navIcon,
            activeTab === 'schedule' &&
              styles.navIconActive,
          ]}>
            ▣
          </Text>

          <Text style={[
            styles.navText,
            activeTab === 'schedule' &&
              styles.navTextActive,
          ]}>
            Расписание
          </Text>
        </Pressable>


        <Pressable
          style={styles.navItem}
          onPress={() =>
            setActiveTab('profile')
          }
        >
          <Text style={[
            styles.navIcon,
            activeTab === 'profile' &&
              styles.navIconActive,
          ]}>
            ◎
          </Text>

          <Text style={[
            styles.navText,
            activeTab === 'profile' &&
              styles.navTextActive,
          ]}>
            Профиль
          </Text>
        </Pressable>

      </View>


      {/* ADD STUDENT MODAL */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setModalVisible(false)
        }
      >

        <View style={styles.modalBackground}>

          <View style={styles.modal}>

            <View style={styles.modalHeader}>

              <View>
                <Text style={styles.modalTitle}>
                  Новый студент
                </Text>

                <Text style={styles.modalSubtitle}>
                  Добавьте информацию
                </Text>
              </View>

              <Pressable
                style={styles.closeButton}
                onPress={() =>
                  setModalVisible(false)
                }
              >
                <Text style={styles.closeText}>
                  ×
                </Text>
              </Pressable>

            </View>


            <Text style={styles.inputLabel}>
              ФИО
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Например: Иван Иванов"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />


            <Text style={styles.inputLabel}>
              Группа
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Например: IS-24"
              placeholderTextColor="#9CA3AF"
              value={group}
              onChangeText={setGroup}
            />


            <Text style={styles.inputLabel}>
              Направление
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Например: Computer Science"
              placeholderTextColor="#9CA3AF"
              value={course}
              onChangeText={setCourse}
            />


            <Pressable
              style={styles.saveButton}
              onPress={addStudent}
            >
              <Text style={styles.saveButtonText}>
                Добавить студента
              </Text>
            </Pressable>


            <Pressable
              style={styles.cancelButton}
              onPress={() => {
                setModalVisible(false);
                setName('');
                setGroup('');
                setCourse('');
              }}
            >
              <Text style={styles.cancelText}>
                Отмена
              </Text>
            </Pressable>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  screen: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },


  /* HEADER */

  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  overline: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#6C63FF',
    marginBottom: 5,
  },

  headerTitle: {
    fontSize: 29,
    fontWeight: '800',
    color: '#172033',
  },

  headerSubtitle: {
    color: '#8A94A6',
    marginTop: 4,
    fontSize: 13,
  },

  profile: {
    width: 47,
    height: 47,
    borderRadius: 16,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },


  /* HOME */

  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },

  heroCard: {
    backgroundColor: '#6C63FF',
    borderRadius: 25,
    padding: 22,
    minHeight: 190,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    marginBottom: 22,
  },

  heroContent: {
    flex: 1,
    paddingRight: 10,
  },

  heroSmall: {
    color: '#DCD9FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 9,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
    lineHeight: 32,
  },

  heroText: {
    color: '#E7E5FF',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
  },

  heroEmoji: {
    fontSize: 65,
  },


  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 13,
  },


  /* STATS */

  stats: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 23,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 13,
    minHeight: 110,
    justifyContent: 'center',
    elevation: 2,
  },

  statIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#F0EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },

  statNumber: {
    fontSize: 21,
    fontWeight: '800',
    color: '#172033',
  },

  statLabel: {
    fontSize: 11,
    color: '#8A94A6',
    marginTop: 2,
  },


  /* ACTIONS */

  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 23,
  },

  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    elevation: 2,
  },

  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#EEEcff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  actionIconBlue: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#E8F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#172033',
  },

  actionText: {
    fontSize: 11,
    color: '#8A94A6',
    marginTop: 3,
  },


  /* TODAY */

  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  todayDate: {
    color: '#6C63FF',
    fontWeight: '800',
    fontSize: 12,
  },

  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 10,
    elevation: 1,
  },

  timeBox: {
    width: 65,
    marginRight: 10,
  },

  time: {
    color: '#6C63FF',
    fontSize: 13,
    fontWeight: '800',
  },

  line: {
    height: 25,
    width: 2,
    backgroundColor: '#DDD9FF',
    marginTop: 6,
    marginLeft: 5,
  },

  lesson: {
    fontSize: 15,
    fontWeight: '800',
    color: '#172033',
  },

  lessonInfo: {
    color: '#8A94A6',
    fontSize: 12,
    marginTop: 6,
  },

  homeFooter: {
    paddingVertical: 20,
  },

  footerText: {
    textAlign: 'center',
    color: '#A5ADBA',
    fontSize: 11,
  },


  /* STUDENTS */

  pageContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#172033',
  },

  pageSubtitle: {
    color: '#8A94A6',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
  },

  plusButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  plusText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '400',
  },

  searchBox: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E9EBF1',
    marginBottom: 12,
  },

  searchIcon: {
    fontSize: 17,
    marginRight: 9,
  },

  searchInput: {
    flex: 1,
    color: '#172033',
    fontSize: 14,
  },

  clear: {
    color: '#9CA3AF',
    fontSize: 24,
  },

  resultsText: {
    color: '#8A94A6',
    fontSize: 12,
    marginBottom: 3,
  },


  /* STUDENT CARD */

  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 15,
    marginTop: 11,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  avatarText: {
    color: '#6C63FF',
    fontSize: 21,
    fontWeight: '800',
  },

  studentContent: {
    flex: 1,
  },

  studentName: {
    color: '#172033',
    fontSize: 16,
    fontWeight: '800',
  },

  studentCourse: {
    color: '#8A94A6',
    fontSize: 11,
    marginTop: 4,
    marginBottom: 6,
  },

  groupBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0EEFF',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
  },

  groupText: {
    color: '#6C63FF',
    fontSize: 10,
    fontWeight: '800',
  },

  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
  },

  deleteText: {
    color: '#E45C5C',
    fontSize: 24,
  },


  /* EMPTY */

  empty: {
    alignItems: 'center',
    paddingTop: 70,
  },

  emptyEmoji: {
    fontSize: 45,
    marginBottom: 15,
  },

  emptyTitle: {
    color: '#172033',
    fontSize: 17,
    fontWeight: '800',
  },

  emptyText: {
    color: '#8A94A6',
    fontSize: 13,
    marginTop: 6,
  },


  /* SCHEDULE */

  daySelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 7,
    marginBottom: 20,
  },

  day: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },

  dayActive: {
    flex: 1,
    backgroundColor: '#6C63FF',
    borderRadius: 13,
    alignItems: 'center',
    paddingVertical: 10,
  },

  dayNumber: {
    color: '#172033',
    fontWeight: '800',
    fontSize: 15,
  },

  dayName: {
    color: '#8A94A6',
    fontSize: 10,
    marginTop: 3,
  },

  dayNumberActive: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },

  dayNameActive: {
    color: '#E7E5FF',
    fontSize: 10,
    marginTop: 3,
  },

  scheduleLarge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 17,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
  },

  scheduleTime: {
    color: '#6C63FF',
    fontSize: 13,
    fontWeight: '800',
    width: 60,
  },

  scheduleTitle: {
    color: '#172033',
    fontSize: 15,
    fontWeight: '800',
  },

  scheduleDescription: {
    color: '#8A94A6',
    fontSize: 12,
    marginTop: 5,
  },

  scheduleRoom: {
    color: '#6C63FF',
    fontSize: 11,
    marginTop: 8,
    fontWeight: '600',
  },


  /* PROFILE */

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    alignItems: 'center',
    paddingVertical: 25,
    marginTop: 20,
    marginBottom: 25,
    elevation: 2,
  },

  bigAvatar: {
    width: 78,
    height: 78,
    borderRadius: 26,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  bigAvatarText: {
    color: '#FFFFFF',
    fontSize: 31,
    fontWeight: '800',
  },

  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#172033',
  },

  profileGroup: {
    color: '#8A94A6',
    fontSize: 13,
    marginTop: 4,
  },

  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
  },

  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F4',
  },

  settingIcon: {
    fontSize: 20,
    width: 35,
  },

  settingContent: {
    flex: 1,
  },

  settingTitle: {
    color: '#172033',
    fontWeight: '700',
    fontSize: 14,
  },

  settingDescription: {
    color: '#9AA3B1',
    fontSize: 11,
    marginTop: 3,
  },

  arrow: {
    color: '#A0A7B2',
    fontSize: 25,
  },


  /* BOTTOM NAVIGATION */

  bottomNav: {
    height: 78,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ECEEF2',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
  },

  navIcon: {
    fontSize: 23,
    color: '#A3AAB5',
    marginBottom: 3,
  },

  navIconActive: {
    color: '#6C63FF',
  },

  navText: {
    fontSize: 10,
    color: '#A3AAB5',
    fontWeight: '600',
  },

  navTextActive: {
    color: '#6C63FF',
    fontWeight: '800',
  },


  /* MODAL */

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(10, 15, 30, 0.5)',
    justifyContent: 'flex-end',
  },

  modal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 30,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  modalTitle: {
    color: '#172033',
    fontSize: 23,
    fontWeight: '800',
  },

  modalSubtitle: {
    color: '#8A94A6',
    fontSize: 12,
    marginTop: 4,
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeText: {
    color: '#6B7280',
    fontSize: 25,
  },

  inputLabel: {
    color: '#4B5563',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 7,
  },

  modalInput: {
    height: 52,
    backgroundColor: '#F9FAFC',
    borderWidth: 1,
    borderColor: '#E3E6EC',
    borderRadius: 14,
    paddingHorizontal: 15,
    color: '#172033',
    fontSize: 14,
    marginBottom: 15,
  },

  saveButton: {
    height: 53,
    backgroundColor: '#6C63FF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  cancelButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },

});